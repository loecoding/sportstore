import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {
  @Prop()
  id: number;

  @Prop()
  paymentID: string;

  @Prop()
  timePayment: string;
  
  @Prop()
  deliveryType: string;

  @Prop()
  deliveryCost: string;

  @Prop()
  deliveryAddress: string;

  @Prop()
  status: string;

  @Prop()
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);