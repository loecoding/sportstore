import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, Query, ValidationPipe, UsePipes, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, CreateVariantDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OrderService } from 'src/order/order.service';
import { CustomerService } from 'src/customer/customer.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService ,private readonly orderService: OrderService ,
  private readonly customerService: CustomerService) {}

  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.addProduct(createProductDto);
  }

  @Post('/variant/')
  // @UsePipes(new ValidationPipe({ transform: true }))
  
  async addVariant(@Body() createVariantDto: CreateVariantDto) {
    const { productId: pId } = createVariantDto

    const product = await this.productService.findProduct(pId)
    if(!product){
      throw new NotFoundException('Product Not Found!')
    }

    return this.productService.addVariant(createVariantDto);
  }

  @Get()
  showProduct() {
    return this.productService.showProduct();
  }

  @Get('/page/')
  showProductEachPage(@Query('page', ParseIntPipe) page: number , @Query('size' , ParseIntPipe) size: number ,
    @Query('search') search:string
  ) {
    
    return this.productService.showProductEachPage(page , size , search)
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id , updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  // @Put('/push/:id')
  // insertProductSize(@Param('id') id: string, @Body() insertProductSize: insertSizeAndQuantityDto) {
  //   // console.log(insertProductSize.size)
  //   return this.productService.insertProductSize(id , insertProductSize.size);
  // } 

  // @Delete('/delete/:categoryId')
  // deleteProductQuantity(@Param('categoryId') categoryId: string ) {
  //   return this.productService.deleteAllQuantityOfCategory(categoryId);
  // } 

  @Delete('/variant/:variantId')
  deleteVariant(@Param('variantId') variantId: string ) {
    return this.productService.deleteVariant(variantId);
  } 

  @Get('/group/:categoryId')
  matchProduct(@Param('categoryId') categoryId: string ) {
    return this.productService.matchProduct(categoryId);
  } 

  @Get('/variant/:categoryId')
  matchProductAndVariant(@Param('categoryId') categoryId: string ) {
    return this.productService.findProductAndVariant(categoryId);
  } 

  @Put('/variant/:productId')
  insertVariantIdToArray(@Param('productId') productId: string, @Body('variantId') variantId: string) {
    console.log(variantId)
    return this.productService.insertVariantIdToArray(productId , variantId);
  } 

}