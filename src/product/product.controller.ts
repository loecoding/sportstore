import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OrderService } from 'src/order/order.service';
import { CustomerService } from 'src/customer/customer.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService ,private readonly orderService: OrderService 
    , private readonly customerService: CustomerService) {}

  @Post()
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

  @Get()
  showProduct() {
    return this.productService.showProduct();
  }

  @Get(':id')
  searchProduct(@Param('id') id: string) {
    return this.productService.searchProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Post('/quantity/:id')
  addQuantity(@Param() id: string ,@Body() quantity: number){
    return this.productService.addQuantity(id,quantity)
  }
  @Put('/quantity/:id')
  updateQuantity(@Param() id: string ,@Body() quantity: number){
    return this.productService.updateQuantity(id,quantity)
  }
}
