import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument> 
  , private readonly productService: ProductService){}

  async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return new this.customerModel(createCustomerDto).save()
  }

  async showCustomer() {
    return this.customerModel.find()
  }

  async searchCustomer(id: string) {
    return this.customerModel.findOne({id})
  }

  async updateCustomer(name: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.updateOne(
      {name}, {$set:{...updateCustomerDto}})
  }

  async deleteCustomer(name: string) {
    return this.customerModel.deleteOne({name})
  }

  async orderBilling(id: number){

  }

}
