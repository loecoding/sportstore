import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { PayloadAuthDto } from './payload.dto';
import { UserRole } from '../customer/schemas/customer.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Request() req, @Body() payload: PayloadAuthDto) {
    console.log('hi!!');
    return this.authService.login(payload.username, payload.password);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async testPayload(@Req() req) {
    return { msg: 'success', auth: req.user };
  }

  @Get('role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async testGuard(@Req() req) {
    return { msg: 'success', auth: req.user };
  }
}
