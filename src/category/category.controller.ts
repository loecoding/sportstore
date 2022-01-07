import { Controller, Get, Post, Body, Param, Delete, Put, Inject, forwardRef } from '@nestjs/common';
import { get } from 'http';
import { CustomerService } from 'src/customer/customer.service';
import { ProductService } from 'src/product/product.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService
    ,@Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
    ,@Inject(forwardRef(() => ProductService)) private readonly productService: ProductService
    ) {}

  @Post()
  addCategory(@Body() createCategory: CreateCategoryDto) {
    console.log({createCategory})
    return this.categoryService.addCategory(createCategory);
  }

  @Get()
  showCategory() {
    return this.categoryService.showCategory();
  }

  @Get(':id')
  searchCategory(@Param('id') id: string) {
    console.log(id)
    return this.categoryService.searchCategory(id);
  }

  @Put('/update/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    console.log(id)
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete('/delete/:id')
  deleteCategory(@Param('id') id: string) {
    console.log(id)
    return this.categoryService.deleteCategory(id);
  }

  @Get('/list/:categoryId')
  showCategoryProduct(@Param('categoryId') categoryId: string){
    return this.productService.showCategoryProduct(categoryId)
  }

  @Get('/list/:categoryId/:categoryId2')
  showTwoCategoryProduct(@Param('categoryId') categoryId: string , @Param('categoryId2') categoryId2: string){
    return this.productService.showTwoCategoryProduct(categoryId, categoryId2)
  }

}
