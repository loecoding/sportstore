import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UsersModule) ,
    forwardRef(() => PassportModule) ,

    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '30s' },
    // })
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('auth.jwtSecret'),
        signOptions: { expiresIn: config.get('auth.jwtExpireIn') },
      }),
      inject: [ConfigService],
    }),

  ],
  providers: [AuthService , LocalStrategy , JwtStrategy] ,
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
