import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  addProduct(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto)
    return this.categoryService.addProduct(createCategoryDto);
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

  
}
