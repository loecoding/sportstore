import { Allow, IsAlpha, IsEmail, IsInt, IsString, Length, Matches, NotContains } from "class-validator"

export class CreateCustomerDto {
    @IsString()
    readonly name: string
    readonly phone: string
    @IsEmail()
    readonly email: string
    readonly address: string

    @Matches(/^[a-zA-Z0-9\S]{6,20}$/)
    readonly username: string
    readonly password: string

}
