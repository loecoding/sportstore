import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService)) private usersService: UsersService , 
    private readonly jwtService: JwtService 
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(userName: string , password: string) {
      const user = await this.usersService.findOne(userName)
      if(!user){
        throw new UnauthorizedException()
      }
      if(password !== user.password){
        throw new UnauthorizedException()
      }

      const payload = { user: userName, sub: user.id };
      
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
