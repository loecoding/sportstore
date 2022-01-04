export class OrderEntity {
    id: number;
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
    priceOrder: number;
}
