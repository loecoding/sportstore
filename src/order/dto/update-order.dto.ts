import { LineItem, OrderPayloadDto } from './create-order.dto';

export class UpdateOrderPayloadDto {
    readonly line_items: LineItem[]
}

export class updateLineItem {
    readonly variantId: string
    readonly quantity: number
}