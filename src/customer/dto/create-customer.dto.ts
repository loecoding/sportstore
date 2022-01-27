import { Allow, IsEmail, IsInt, IsString } from "class-validator"

export class CreateCustomerDto {
    @IsString()
    readonly name: string
    readonly phone: string
    @IsEmail()
    readonly email: string
    readonly address: string
    readonly username: string
    readonly password: string

}
