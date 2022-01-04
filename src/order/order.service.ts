import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  
  
  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const dataOrderArr = this.getOrderByProductId
    return new this.orderModel(createOrderDto).save()
  }

  async showOrder() {
    return this.orderModel.find()
  }

  async findOrder(id: string) {

    return this.orderModel.findOne({id})
  }

  async updateOrder(id: string, udateOrderDto: UpdateOrderDto) {
    return this.orderModel.updateOne({id}, 
      {$set:{...udateOrderDto}}
      )
  }

  async deleteOrder(id: string) {
    return this.orderModel.deleteOne({id})
  }

  async paymentMethod(orderId: string , pay: number){
    
    const findTotalPriceOrder = await this.orderModel.findOne({orderId})
    
    const findAndPayment = await this.orderModel.findOneAndUpdate(
      {orderId , totalPrice: pay } , {status:'paid' , timePayment: new Date() , deliveryType:'Kerry' ,
    paymentId: uuid() , priceOrder:  + pay}).lean()

    console.log(await findTotalPriceOrder.deliveryCost)
}

  async getOrderByProductId(customerId: string , productId : string , quantity: number){
    const findCustomer = await this.customerService.findCustomerById(customerId)
    const findProduct = await this.productService.findPriceByProductId(productId)

    let orderArray = new OrderEntity()
    
    orderArray.id =  Math.floor(Math.random() * (999 - 100 + 1)) + 100
    orderArray.customerId = customerId
    orderArray.customerName = findCustomer.name
    orderArray.productName = findProduct.name
    orderArray.productQuantity = quantity
    orderArray.paymentId = ''
    orderArray.timePayment = null
    orderArray.deliveryType = ''
    orderArray.deliveryCost = 45
    orderArray.deliveryAddress = findCustomer.address
    orderArray.status = 'pending'
    orderArray.totalPrice = findProduct.price * (quantity)

    // this.OrderArray.push(orderArray)
    
    console.log(orderArray)
    return new this.orderModel(orderArray).save()

  }



}
