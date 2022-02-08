import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel : Model<CategoryDocument> 
  ,@Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService
  ,@Inject(forwardRef(() => ProductService)) private readonly productService: ProductService
  ) { }
  CategoryArray:CategoryEntity[] = []

  async addCategory(createProductDto: CreateCategoryDto): Promise<Category> {
    return new this.categoryModel(createProductDto).save()
  }

  async showCategory() {
    return await this.categoryModel.find()
  }

  async searchCategory(id: string): Promise<Category> {
    return this.categoryModel.findOne({_id: id})
  } 

  async updateCategory(id: string, udateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.updateOne({id}, 
      {$set:{...udateCategoryDto}}
      )
  }

  async deleteCategory(id: string) {
    return this.categoryModel.deleteOne({id})
  }

  
}
