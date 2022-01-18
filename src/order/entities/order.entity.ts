import { LineItem } from "../dto/create-order.dto";

export class OrderEntity {
    customerId : string;
    customerName : string;
    productName: string;
    productQuantity: number;
    paymentId: string
    timePayment: string;
    deliveryType: string;
    deliveryCost: number;
    deliveryAddress: string;
    status: string;
    totalPrice: number;
    totalPriceAndDelivery: number;
    line_items: LineItem[]
}
