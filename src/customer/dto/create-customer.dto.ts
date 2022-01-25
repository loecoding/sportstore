import { Allow, IsEmail, IsInt, IsString } from "class-validator"

export class CreateCustomerDto {
    @IsString()
    readonly name: string
    @IsInt()
    readonly phone: string
    @IsEmail()
    readonly email: string
    @Allow()
    readonly address: string
}
