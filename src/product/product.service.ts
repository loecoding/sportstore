import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { CreateProductDto, CreateVariantDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product , ProductDocument} from './schemas/product.schema';
import { CategoryService } from 'src/category/category.service';
import { Variant, VariantDocument } from './schemas/variant.schema';


@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument> 
  , @InjectModel(Variant.name) private variantModel: Model<VariantDocument>
  , @Inject(forwardRef(() => ProductService)) private readonly categoryService: CategoryService
  ){}

  addProduct(data: CreateProductDto): Promise<Product> {

    return new this.productModel({...data, category: new Types.ObjectId(data.category)}).save()
  }

  async addVariant(variant: CreateVariantDto){
 
      const newVariant = await new this.variantModel({...variant , productId: new Types.ObjectId(variant.productId)}).save()
      const productId  = newVariant.productId.toString()
      const variantId  = newVariant._id.toString()
      const addVariantToArray = await this.productModel.findByIdAndUpdate({_id: productId}, {$push: {variants: new Types.ObjectId(variantId)}}
      ).exec()
    
    return newVariant && addVariantToArray
  }

  async showProduct() {
    return this.productModel.find()
  }

  async findProduct(id: string) {
    return this.productModel.findOne({_id: id})
  }

  async findVariant(id: string) {
    return this.variantModel.findOne({_id: id})
  }

  async findVariantByIds(ids: string[]) {
    return this.variantModel.find({_id: {$in: ids}})
  }

  async decreaseVariantQuantity(id: string , quantity: number) {
    console.log({id, quantity})
    return this.variantModel.updateOne({_id: id},{ $inc: {quantity: -quantity} })
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({_id: id} , {$set:{...updateProductDto}})
  }


  async matchProduct(categoryId: string) {
    return await this.productModel.aggregate([
      {$lookup: {
        from: "categories" , 
        localField: "category",
        foreignField: "_id",
        as: "categoryName"}},
      {$match: { category : new Types.ObjectId(categoryId) }},
      {$unwind: "$stock"},
      // { $group: { _id: '$sizes', count: { $sum:1 } } }
      // {$out: "resultSize"}
    ]).exec()
  }

  async matchProductAndVariant(categoryId: string) {
    return await this.productModel.aggregate([{
      $lookup: {
        from: "variants" , 
        localField: "category",
        foreignField: "_id",
        as: "categoryName"}},
      {$lookup: {
        from: "variants" , 
        localField: "variants",
        foreignField: "_id",
        as: "variantProduct"
      }},
      {$match: { category : new Types.ObjectId(categoryId) }},
      // {$unwind: "$stock"},
      // { $group: { _id: '$sizes', count: { $sum:1 } } }
      // {$out: "resultSize"}
    ]).exec()
  }

  async findProductAndVariant(categoryId: string) {
    return await this.productModel.findOne({category: categoryId}).populate(['variants' , 'category']).exec()
  }

  async deleteAllQuantityOfCategory(categoryId: string) {
    // await this.productModel.aggregate([
    //   {$match: { _id : new Types.ObjectId(productId) }},
    //   {$unset: "quantity"}
    // ]).exec()
    return await this.productModel.update({category: categoryId} , {$unset: {price: ""}})
  }

  async deleteProduct(id: string) {
    return this.productModel.deleteOne({_id: id})
  }

  async getPriceByVariantId(variantId: string , quantity: number): Promise<Variant>{
    const findVariant = await this.findVariant(variantId); 
    const updateQuantity = findVariant.quantity - quantity
    
    const variantDocument = await this.variantModel.findOne({_id: variantId}).populate('price').exec() 
    && await this.variantModel.findOneAndUpdate({_id: variantId},{quantity: updateQuantity}).exec()
    if (!variantDocument) {
      return;
    }
    const variant = variantDocument.toObject();
    const price = variant.price;
    console.log({price})
    return {...variant , price}
  }

  async showCategoryProduct(categoryId : string) {
    const productDocument = await this.productModel.find({category: categoryId})
    .populate('category').exec()
    
    return productDocument
  }

  async showTwoCategoryProduct(categoryId : string , categoryId2 : string){
    const productDocument = await this.productModel.find({$or: [{category: categoryId},{category: categoryId2}]
    }).populate('category').exec()
    
    return productDocument 
  }

  async insertVariantIdToArray(productId: string, variantId: string) {
    return await this.productModel.findByIdAndUpdate({_id: productId}, {$push: {variants: new Types.ObjectId(variantId)}}
    ).exec()
  }

  async insertSize(id: string, insertProductSize: string) {
    
    return await this.productModel.findByIdAndUpdate({_id: id}, {$push: {size: insertProductSize}}
    ).exec()
  }
} 
