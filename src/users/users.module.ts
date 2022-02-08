import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';

@Module({
  imports: [
    forwardRef(() => AuthModule) , 
    // forwardRef(() => JwtModule)
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
