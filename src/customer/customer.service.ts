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
    return this.customerModel.findOne({id})
  }

  async updateCustomer(name: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.updateOne(
      {name}, {$set:{...updateCustomerDto}})
  }

  async deleteCustomer(name: string) {
    return this.customerModel.deleteOne({name})
  }

  // async shopping(customerId: string, productId: string ,quantity: number) {
  //   // const getPriceByCustomer = this.customerModel.findOne({id})
  //   // const getProductPriceById = await this.productService.getProductPriceById(productId)
  //   // const getOrderById = await this.oderService.

  //   // console.log(`customerId: ${getPriceByCustomer} buy productId: ${getProductPriceById.id} price: ${getProductPriceById.price}`)
  //   // return `customerId: ${getPriceByCustomer} buy productId: ${getProductPriceById.id} price: ${getProductPriceById.price}`
  //   return await this.oderService.getPriceByProductId(customerId,productId,quantity)

  // }


}
