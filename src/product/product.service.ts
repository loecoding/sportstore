import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { Product , ProductDocument} from './schemas/product.schema';
import { CreateQuantityDto } from './dto/create-quantity.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    return new this.productModel(createProductDto).save()
  }

  async showProduct() {
    return this.productModel.find()
  }

  async searchProduct(id: string) {
    return this.productModel.findOne({id})
  }

  async updateProduct(id: string, udateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({id}, 
      {$set:{...udateProductDto}}
      )
  }

  async deleteProduct(id: string) {
    return this.productModel.deleteOne({id})
  }

  async addQuantity(id: string , createQuantityDto: CreateQuantityDto): Promise<Product>{
    return new this.productModel(createQuantityDto).save()
  }
  async updateQuantity(id: string , updateQuantityDto: UpdateQuantityDto){
    return this.productModel.updateOne({id}, 
      {$set:{...updateQuantityDto}}
      )
  }
  
  async findPriceByProductId(id: string): Promise<Product>{
    const productDocument = await this.productModel
    .findOne({id}).populate('price').exec()
    if (!productDocument) {
      return;
    }
    const product = productDocument.toObject();
    const price = product.price;
    // console.log(price)
    return {...product , price}
  }

}
