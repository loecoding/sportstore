import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types , Schema as MongooseSchema} from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

  @Prop()
  name: string;

  @Prop()
  detail: string;

  @Prop()
  price: number;
  
  @Prop()
  quantity: number;

  @Prop({type: MongooseSchema.Types.ObjectId , ref: Category.name})
  category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


