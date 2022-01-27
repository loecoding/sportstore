import { Types } from "mongoose"

export class JwtPayload {
    readonly user: string
    readonly sub: string 
    readonly role: string
}