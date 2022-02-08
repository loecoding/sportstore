import { Prop } from "@nestjs/mongoose"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { isEmpty, IsEmpty, IsFQDN, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Length, Min, MinLength, ValidationArguments } from "class-validator"
import { Types } from "mongoose"

export class CreateProductDto {
    
    @IsNotEmpty()
    @ApiProperty({ example: 'John'})
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    readonly detail: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(24)
    readonly category: string

    // @IsOptional()
    // @IsMongoId({each: true})
    // @ApiPropertyOptional()
    // readonly variants: string[]
}
export class CreateVariantDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    readonly productId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    readonly price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    readonly quantity: number;
    
    @ApiProperty()
    @IsNotEmpty({
        message: 'Not Empty'
    })
    readonly size: string;
}

export class DeleteProductVariantsDto {
    @IsMongoId({each: true})
    @ApiProperty()
    readonly variantIds: string[]

    @IsMongoId()
    @ApiProperty()
    readonly productId: string
}

