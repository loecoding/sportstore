import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { Product , ProductDocument} from 'src/product/schemas/product.schema';
import { OrderService } from 'src/order/order.service';


@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument> 
  , private readonly productService: ProductService , private readonly oderService: OrderService){}

  async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return new this.customerModel(createCustomerDto).save()
  }

  async showCustomer() {
    return this.customerModel.find()
  }

  async findCustomerById(id: string): Promise<Customer>{
    return this.customerModel.findOne({_id: id})
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.updateOne(
      {_id: id}, {$set:{...updateCustomerDto}})
  }

  async deleteCustomer(id: string) {
    return this.customerModel.deleteOne({_id: id})
  }

}
