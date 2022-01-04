import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
//{timestamps: true}
@Schema()
export class Order {
  @Prop()
  id: number;

  @Prop()
  customerId : string

  @Prop()
  productName: string;

  @Prop()
  productQuantity: number;

  @Prop()
  paymentID: number;

  @Prop()
  timePayment: Date;
  
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

  @Prop()
  priceOrder: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);