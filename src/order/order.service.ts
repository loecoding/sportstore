import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order , OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CustomerService } from 'src/customer/customer.service';
import { ProductService } from 'src/product/product.service';
import { OrderEntity } from "./entities/order.entity"
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument> 
  ,@Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
  ,@Inject(forwardRef(() => ProductService)) private readonly productService: ProductService
  ){}

  OrderArray:OrderEntity[] = []
  
  async showOrder() {
    return this.orderModel.find()
  }

  async findOrder(id: string) {

    return this.orderModel.findOne({_id: id})
  }

  async updateOrder(id: string, udateOrderDto: UpdateOrderDto) {
    return this.orderModel.updateOne({_id: id}, 
      {$set:{...udateOrderDto}})
  }

  async deleteOrder(id: string) {
    return this.orderModel.deleteOne({_id: id})
  }

  async paymentMethod(orderId: string , pay: number){
    
    const findAndPayment = await this.orderModel.findOneAndUpdate(
      {_id: orderId , totalPriceAndDelivery: pay } , {status:'paid' , timePayment: new Date() , deliveryType:'Kerry' ,
      paymentId: uuid() }).lean().exec()

    return findAndPayment
}

  async getOrderByProductId(customerId: string , productId : string , quantity: number){
    const findCustomer = await this.customerService.findCustomerById(customerId)
    const findProduct = await this.productService.getProductById(productId , quantity)
   
    let orderArray = new OrderEntity()

    orderArray.customerId = customerId
    orderArray.customerName = findCustomer.name
    orderArray.productName = findProduct.name
    orderArray.productQuantity = quantity
    orderArray.paymentId = null
    orderArray.timePayment = null
    orderArray.deliveryType = null
    orderArray.deliveryCost = 45
    orderArray.deliveryAddress = findCustomer.address
    orderArray.status = 'pending'
    orderArray.totalPrice = findProduct.price * (quantity)
    orderArray.totalPriceAndDelivery = orderArray.totalPrice + orderArray.deliveryCost

    return await new this.orderModel(orderArray).save()
  }

}
