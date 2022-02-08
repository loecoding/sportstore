import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LineItem } from '../dto/create-order.dto';
import * as mongooseDelete from 'mongoose-delete';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PAID = 'Paid',
  PENDDING = 'Pending',
  CANCEL = 'Cancel',
  EXPIRED = 'Expired',
}

export enum DeliveryType {}

@Schema({ versionKey: false, timestamps: true })
export class Order {
  @Prop()
  customerId: string;

  @Prop()
  customerName: string;

  @Prop({ type: [{ variantId: Types.ObjectId, quantity: Number }], _id: false })
  line_items: LineItem[];

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

export const OrderSchema = SchemaFactory.createForClass(Order).plugin(
  mongooseDelete,
  {
    deletedAt: true,
    overrideMethods: 'all',
  },
);
