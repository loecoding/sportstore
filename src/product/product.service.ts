import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product , ProductDocument} from './schemas/product.schema';
import { CategoryService } from 'src/category/category.service';



@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>
  ,@Inject(forwardRef(() => ProductService)) private readonly categoryService: CategoryService
  ){}

  async addProduct(data: CreateProductDto): Promise<Product> {
    return await new this.productModel({...data, category: new Types.ObjectId(data.category)}).save()
  }

  async showProduct() {
    return this.productModel.find()
  }

  async searchProduct(id: string) {
    return this.productModel.findOne({_id: id})
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({_id: id} , {$set:{...updateProductDto}})
  }

  async deleteProduct(id: string) {
    return this.productModel.deleteOne({_id: id})
  }

  async getProductById(id: string , quantity: number): Promise<Product>{
    const searchQuantity = await this.searchProduct(id); 
    const updateQuantity = searchQuantity.quantity - quantity
    
    const productDocument = await this.productModel.findOne({_id: id}).populate('price').exec() 
    && await this.productModel.findOneAndUpdate({_id: id},{quantity: updateQuantity}).exec()
    if (!productDocument) {
      return;
    }
    const product = productDocument.toObject();
    const price = product.price;

    return {...product , price}
  }

  async showCategoryProduct(categoryId : string) {
    const productDocument = this.productModel.find({category: categoryId})
    .populate('category').exec()
    
    return productDocument
  }

  async showTwoCategoryProduct(categoryId : string , categoryId2 : string){
    const productDocument = await this.productModel.find({$or: [{category: categoryId},{category: categoryId2}]
    }).populate('category').exec()
    
    return productDocument 
  }
}