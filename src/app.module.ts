import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import AuthConfig from './config/auth.config';

@Module({
  imports: [CustomerModule ,ProductModule , OrderModule , CategoryModule , MongooseModule.forRoot('mongodb://localhost/mydb'),
   AuthModule , 
   UsersModule , 
   ConfigModule.forRoot({
     isGlobal: true,
     load: [AuthConfig]
   })
  //  JwtModule.register({ secret: 'hard!to-guess_secret' })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
