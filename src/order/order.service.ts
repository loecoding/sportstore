import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order , OrderDocument } from './schemas/order.schema';
import { OrderPayloadDto } from './dto/create-order.dto';
import { CustomerService } from 'src/customer/customer.service';
import { ProductService } from 'src/product/product.service';
import { v4 as uuid } from 'uuid';
import { Variant } from 'src/product/schemas/variant.schema';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: SoftDeleteModel<OrderDocument> 
  ,@Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
  ,@Inject(forwardRef(() => ProductService)) private readonly productService: ProductService
  ){}
  // OrderArray:OrderEntity[] = []

  async showOrder() {
    return this.orderModel.find()
  }

  async findOrder(id: string) {
    return this.orderModel.findOne({_id: id})
  }

  // async updateOrder(id: string, udateOrderDto: UpdateOrderDto) {
  //   return this.orderModel.updateOne({_id: id}, 
  //     {$set:{...udateOrderDto}})
  // }

  async findlineItemsById(ids: string[]) {
    return this.orderModel.find({_id: {$in: ids}})
  }

  async deleteOrder(id: string) {
    return this.orderModel.deleteOne({_id: id})
  }

  async paymentMethod(orderId: string , pay: number){
    const findAndPayment = await this.orderModel.findOneAndUpdate(
      {_id: orderId , totalPriceAndDelivery: pay } , {status:'paid' , timePayment: new Date() , deliveryType:'Kerry' ,
      paymentId: uuid() }).lean().exec()

    for(const lineItem of findAndPayment.line_items){
      await this.productService.decreaseVariantQuantity(lineItem.variantId , lineItem.quantity)
    }
    return findAndPayment
  }

  async getTotalPrice(variant: Variant , payload : OrderPayloadDto) {
    const lineItem = payload.line_items.find(item => item.variantId === variant._id.toString())
    return variant.price * lineItem.quantity
  }

  async getQuantity(variant: Variant , payload : OrderPayloadDto) {
    const lineItem = payload.line_items.find(item => item.variantId === variant._id.toString())
    return lineItem.quantity
  }

  async getOrderByVariantId(customerId: string , payload : OrderPayloadDto){
    const customer = await this.customerService.findCustomerById(customerId)
    const variantProducts = await this.productService.findVariantByIds(payload.line_items.map( item => item.variantId ))
    // console.log(variantProducts)
    let totalPrice = 0
    for(const variant of variantProducts){
      const price = await this.getTotalPrice(variant , payload)
      totalPrice = totalPrice + price 
    }

    /*Add Data to collection
    let orderArray = new OrderEntity()
    orderArray.line_items = payload.line_items
    orderArray.customerId = customerId
    orderArray.customerName = customer.name
    // orderArray.productName = product.name
    // orderArray.productQuantity = quantity
    orderArray.paymentId = null
    orderArray.timePayment = null
    orderArray.deliveryType = null
    orderArray.deliveryCost = 45
    orderArray.deliveryAddress = customer.address
    orderArray.status = 'pending'
    orderArray.totalPrice = totalPrice
    orderArray.totalPriceAndDelivery = orderArray.totalPrice + orderArray.deliveryCost

    const order = new Order()
    order.line_items = payload.line_items
    order.customerId = customerId
    order.customerName = customer.name
    order.paymentId = null
    order.timePayment = null
    order.deliveryType = null
    order.deliveryCost = 45
    order.deliveryAddress = customer.address
    order.status = 'pending'
    order.totalPrice = totalPrice
    order.totalPriceAndDelivery = order.totalPrice + order.deliveryCost*/

    const deliveryCost = 45
    const order = new this.orderModel({
      line_items: payload.line_items , 
      customerId: customerId ,
      customerName: customer.name,
      paymentId: null,
      timePayment: null,
      deliveryType: null,
      deliveryCost: deliveryCost,
      deliveryAddress: customer.address,
      status: 'pending',
      totalPrice: totalPrice,
      totalPriceAndDelivery: totalPrice + deliveryCost
    })
    return await order.save()
  }

  async updateCart(orderId : string , payload: OrderPayloadDto){
    // const line_item = await this.orderModel.find({delete: true})
    // console.log(line_item)

    const order = await this.orderModel.findOne({_id: orderId})
    if(!order){
      throw new NotFoundException()
    }
    // return await this.orderModel.findOneAndUpdate({_id: orderId} , {$set: {line_items: payload.line_items} })
    // return this.orderModel.delete({_id: orderId}).exec()
  }
}
