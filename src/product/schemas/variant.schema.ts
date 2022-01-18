import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types , Schema as MongooseSchema} from 'mongoose';
import { BaseSchema } from './base.schema';

export type VariantDocument = Variant & Document;

@Schema()
export class Variant extends BaseSchema {

  @Prop({type: MongooseSchema.Types.ObjectId })
  productId: Types.ObjectId

  @Prop()
  price: number;
  
  @Prop()
  quantity: number;

  @Prop()
  size: string;

}

export const VariantSchema = SchemaFactory.createForClass(Variant);


