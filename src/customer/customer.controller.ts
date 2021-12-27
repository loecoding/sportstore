import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
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
  searchCustomer(@Param('id') id: string) {
    console.log(name)
    return this.customerService.searchCustomer(id);
  }

  @Put('/id/:id')
  updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    console.log(id)
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('/id/:id')
  deleteCustomer(@Param('id') id: string) {
    console.log(id)
    return this.customerService.deleteCustomer(id);
  }
  
  @Post('/shopping/:id')
  shopping(@Param('id') id: number ,@Body() productId: number){
    
  }
}
