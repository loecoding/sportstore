import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel : Model<CategoryDocument> ) { }

  async addProduct(createProductDto: CreateCategoryDto): Promise<Category> {
    return new this.categoryModel(createProductDto).save()
  }

  async showCategory() {
    return this.categoryModel.find()
  }

  async searchCategory(id: string) {
    return this.categoryModel.findOne({id})
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
