import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UnprocessableEntityException, Inject, forwardRef, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { JwtPayload } from 'src/auth/jwt-payload';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserAuth } from 'src/auth/user-auth.decorator';
import { OrderPayloadDto } from 'src/order/dto/create-order.dto';
import { UpdateOrderPayloadDto } from 'src/order/dto/update-order.dto';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { Variant, VariantDocument } from 'src/product/schemas/variant.schema';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserRole } from './schemas/customer.schema';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService 
    , private productService: ProductService , private orderService: OrderService
    ) {}

  @Post()
  addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    // console.log(createCustomerDto)
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
  
  @Post('/shopping/')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.USER)
  async shopping(@Body() payload: OrderPayloadDto , @Req() req , @UserAuth() {sub: customerId} : JwtPayload){
    // const customerId = userAuth.sub
    
    for(const lineItem of payload.line_items){  
      const variant = await this.productService.findVariant(lineItem.variantId)
      
      if(!variant){
        throw new UnprocessableEntityException(
          `Not Found item ${lineItem.variantId}`,
          );
      }
      if(variant.quantity < lineItem.quantity){
        throw new UnprocessableEntityException(
          `Quantity should not greater than inventory variantId: (${variant._id}) quantity: (${variant.quantity})`,
          );
      }
    }
    return await this.orderService.getOrderByVariantId(customerId, payload)
  }

  @Post('/payment/')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.USER)
  async payment(@Query('orderId') orderId: string ,  @Query('pay')  pay: number , @UserAuth() {sub: customerIdPayload} : JwtPayload){
    const order = await this.orderService.findOrder(orderId)
    const status = order.status.toString()
    const customerId = order.customerId.toString()

    if(customerId !== customerIdPayload){
      throw new ForbiddenException('This order not is your order!')
    }
    if(status === 'paid'){
      throw new UnprocessableEntityException(
        `This Order have been payment : ${orderId}`,
        );
    }
    return await this.orderService.paymentMethod(orderId,pay)
  }

  @Patch('/cart/')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(UserRole.USER)
  async updateCart(@Query('orderId') orderId: string , @Body() updatePayloadOrderDto : OrderPayloadDto){

      return await this.orderService.updateCart(orderId , updatePayloadOrderDto )
  }

}
