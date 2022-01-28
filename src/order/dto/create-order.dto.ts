import { IsInt, IsMongoId } from "class-validator"
export class CreateOrderDto {}

export class OrderPayloadDto {
    readonly line_items: LineItem[]
    
}
export class LineItem {
    readonly variantId: string
    readonly quantity: number
}
export class ValidateQuery{
    @IsMongoId()
    readonly id: string
    @IsInt()
    readonly pay: number
}