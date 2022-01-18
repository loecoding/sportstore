export class CreateProductDto {
    readonly name: string
    readonly detail: string
    readonly quantity: number
    readonly category: string
    readonly size: string
}
export class CreateVariantDto{
    readonly productId: string;
    readonly price: number;
    readonly quantity: number;
    readonly size: string;
}