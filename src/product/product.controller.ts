import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
  ValidationPipe,
  UsePipes,
  NotFoundException,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateVariantDto,
  DeleteProductVariantsDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OrderService } from '../order/order.service';
import { CustomerService } from '../customer/customer.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../customer/schemas/customer.schema';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Post('/variant/')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'add variant succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async addVariant(@Body() createVariantDto: CreateVariantDto) {
    const { productId: pId } = createVariantDto;

    const product = await this.productService.findProduct(pId);
    if (!product) {
      throw new NotFoundException('Product Not Found!');
    }

    return this.productService.addVariant(createVariantDto);
  }

  @Get()
  showProduct() {
    return this.productService.showProduct();
  }

  @Get('/page/')
  showProductEachPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search: string,
  ) {
    return this.productService.showProductEachPage(page, size, search);
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'delete product succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Delete('/variant/')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'delete variant succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteVariant(@Query() params: DeleteProductVariantsDto) {
    return this.productService.deleteVariant(
      params.productId,
      params.variantIds,
    );
  }

  @Get('/group/:categoryId')
  matchProduct(@Param('categoryId') categoryId: string) {
    return this.productService.matchProduct(categoryId);
  }

  @Get('/variant/:categoryId')
  matchProductAndVariant(@Param('categoryId') categoryId: string) {
    return this.productService.matchProductAndVariant(categoryId);
  }
}
