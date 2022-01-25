import { Prop } from "@nestjs/mongoose"
import { Transform } from "class-transformer"
import { IsEmpty, IsFQDN, IsInt, IsNotEmpty, IsString, Length, Min, MinLength, ValidationArguments } from "class-validator"
import { Types } from "mongoose"

export class CreateProductDto {
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly detail: string
    @IsNotEmpty()
    @Length(24)
    readonly category: string
    readonly size: string
}
export class CreateVariantDto{
    
    @Length(24,24, {
        message: 'Title is too short',
      })
    @IsNotEmpty()
    readonly productId: string;
    
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    readonly price: number;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    readonly quantity: number;
    
    @IsNotEmpty({
        message: 'Not Empty'
    })
    readonly size: string;
}
