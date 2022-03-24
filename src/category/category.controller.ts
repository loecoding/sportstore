import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Inject,
  forwardRef,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CustomerService } from '../customer/customer.service';
import { UserRole } from '../customer/schemas/customer.schema';
import { ProductService } from '../product/product.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'add category succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  addCategory(@Body() createCategory: CreateCategoryDto) {
    console.log({ createCategory });
    return this.categoryService.addCategory(createCategory);
  }

  @Get()
  showCategory() {
    return this.categoryService.showCategory();
  }

  @Get(':id')
  searchCategory(@Param('id') id: string) {
    console.log(id);
    return this.categoryService.searchCategory(id);
  }

  @Put('/update/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'add category succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    console.log(id);
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'delete category succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteCategory(@Param('id') id: string) {
    console.log(id);
    return this.categoryService.deleteCategory(id);
  }

  @Get('/list/:categoryId')
  showCategoryProduct(@Param('categoryId') categoryId: string) {
    return this.productService.showCategoryProduct(categoryId);
  }

  @Get('/list/:categoryId/:categoryId2')
  showTwoCategoryProduct(
    @Param('categoryId') categoryId: string,
    @Param('categoryId2') categoryId2: string,
  ) {
    return this.productService.showTwoCategoryProduct(categoryId, categoryId2);
  }

  @Get('/group/:categoryId')
  groupProduct(@Param('categoryId') categoryId: string) {
    return this.productService.matchProduct(categoryId);
  }
}
