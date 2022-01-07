import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
//{timestamps: true}
@Schema()
export class Order {

  @Prop()
  customerId : string

  @Prop()
  customerName : string

  @Prop()
  productName: string;

  @Prop()
  productQuantity: number;

  @Prop()
  paymentId: string;

  @Prop()
  timePayment: Date;
  
  @Prop()
  deliveryType: string;

  @Prop()
  deliveryCost: number;

  @Prop()
  deliveryAddress: string;

  @Prop()
  status: string;

  @Prop()
  totalPrice: number;

  @Prop()
  totalPriceAndDelivery: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);