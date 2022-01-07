import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService 
    , private productService: ProductService , private orderService: OrderService
    ) {}

  @Post()
  addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto)
    return this.customerService.addCustomer(createCustomerDto);
  }

  @Get()
  showCustomer() {
    return this.customerService.showCustomer();
  }

  @Get(':id')
  findCustomerById(@Param('id') id: string) {
    console.log(id)
    return this.customerService.findCustomerById(id);
  }

  @Put(':id')
  updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    console.log(id)
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    console.log(id)
    return this.customerService.deleteCustomer(id);
  }
  
  @Post('/shopping/:customerId/:productId/:quantity')
  async shopping(@Param('customerId') customerId: string , @Param('productId') productId:string 
  , @Param('quantity') quantity:number){
    // console.log({customerId,productId})
    return await this.orderService.getOrderByProductId(customerId,productId,quantity)
  }

  @Post('/payment/:orderId/:pay')
  async payment(@Param('orderId') orderId: string ,  @Param('pay')  pay: number ){
    return await this.orderService.paymentMethod(orderId,pay)
  }

}
