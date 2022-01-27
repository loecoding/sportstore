import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService, UserWithoutPassword } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { CustomerService } from 'src/customer/customer.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService ,
    private readonly jwtService: JwtService 
    ) {}

    // async validateUser(username: string, pass: string): Promise< UserWithoutPassword | null> {
    //   const user = await this.usersService.findOne(username);
    //   if (user && user.password === pass) {
    //     const { password, ...result } = user;
    //     return result;
    //   }
    //   return null;
    // }

    async login(userName: string , password: string) {
      const user = await this.customerService.findOneByUsername(userName)
      if(!user){
        throw new UnauthorizedException()
      }
      const isPasswordMatch = await bcrypt.compare(password , user.password)
      if(!isPasswordMatch){
        throw new UnauthorizedException()
      }

      const payload: JwtPayload = { 
        user: userName , 
        sub: user._id.toString() ,
        role: user.role
      };
      
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    async hash(password:string): Promise<string>{
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash
    }
    
}
