import { Body, Controller, Get, Inject, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { PayloadAuthDto } from './user-pass.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService
    ){}
    @Post('login')
    async login(@Request() req , @Body() payload: PayloadAuthDto) {
    
      return this.authService.login(payload.username , payload.password)
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    async testPayload(@Req() req){
        return {msg: 'success' , auth: req.user}
    }
}
