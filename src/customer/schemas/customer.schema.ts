import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

export enum UserRole{
  ADMIN = "Admin" ,
  USER = "User"
}

@Schema({ versionKey: false })
export class Customer {


  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone: string;
  
  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  username: string;

  @Prop()
  password: string

  @Prop({
    type: String,
    enum: [UserRole],
    default: UserRole.USER,
  })
  role: UserRole

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);