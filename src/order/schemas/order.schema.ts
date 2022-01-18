import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LineItem, OrderPayloadDto } from '../dto/create-order.dto';

export type OrderDocument = Order & Document;
//{timestamps: true}
@Schema()
export class Order {

  @Prop()
  customerId : string

  @Prop()
  customerName : string

  // @Prop()
  // productName: string;

  @Prop({type: [{variantId: Types.ObjectId , quantity: Number}] , _id:false})
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

export const OrderSchema = SchemaFactory.createForClass(Order);