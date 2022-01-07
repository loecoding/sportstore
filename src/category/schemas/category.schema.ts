import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  id: string;

  @Prop()
  name: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);