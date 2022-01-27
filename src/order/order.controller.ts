import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderPayloadDto } from './dto/update-order.dto';
import { Customer } from 'src/customer/schemas/customer.schema';
import { CustomerService} from 'src/customer/customer.service'
import { ProductService } from 'src/product/product.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService , private customerService: CustomerService
    ,private productService: ProductService ) {}

  // @Post()
  // addOrder(@Body() createOrderDto: CreateOrderDto) {
  //   return this.orderService.addOrder(createOrderDto);
  // }

  @Get()
  showOrder() {
    return this.orderService.showOrder();
  }

  @Get(':id')
  findOrder(@Param('id') id: string) {
    console.log(id)
    return this.orderService.findOrder(id);
  }
  
  // @Put(':id')
  // updateOrder(@Param('id') id: string, @Body() updateCatDto: UpdateOrderDto) {
  //   console.log(id)
  //   return this.orderService.updateOrder(id, updateCatDto);
  // }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    console.log(id)
    return this.orderService.deleteOrder(id);
  }

  @Post(':id')
  paymentMothod(@Param('id') id: string , @Body() price: number){
    console.log(price)
    
  }
  @Post(':id')
  paymentDetail(@Param('id') id: string){
    console.log(id)
    
  }
}
