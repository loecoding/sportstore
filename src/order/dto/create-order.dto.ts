export class CreateOrderDto {}

export class OrderPayloadDto {
    readonly line_items: LineItem[]
    
}
export class LineItem {
    readonly variantId: string
    readonly quantity: number
}