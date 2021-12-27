import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order , OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer , CustomerDocument} from 'src/customer/schemas/customer.schema';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument> , private readonly customerService: CustomerService
  ){}

  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
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

  async paymentMethod(paymentDto: CreateOrderDto){
    const date = new Date()
    // const price = this.customerService.
    console.log(date)
    // if(paymentDto === price){
      
    // }
    
  }

}
