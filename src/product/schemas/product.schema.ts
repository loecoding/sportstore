import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  detail: string;

  @Prop()
  price: number;
  
  @Prop()
  quantity: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);


