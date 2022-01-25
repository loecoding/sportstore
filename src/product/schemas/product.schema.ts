import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types , Schema as MongooseSchema} from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Variant } from './variant.schema';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {

  @Prop()
  name: string;

  @Prop()
  detail: string;

  @Prop({type: MongooseSchema.Types.ObjectId , ref: Category.name})
  category: Types.ObjectId;

  @Prop({type: MongooseSchema.Types.Array , ref: Variant.name})
  variants: Types.ObjectId

}

export const ProductSchema = SchemaFactory.createForClass(Product);


