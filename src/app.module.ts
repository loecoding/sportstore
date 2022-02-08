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
import { CommandModule } from 'nestjs-command';
import { UserCommand } from './users/user.command';
import { UsersService } from './users/users.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    // CustomerModule,
    // ProductModule,
    // OrderModule,
    // CategoryModule,
    MongooseModule.forRoot('mongodb://localhost/sss'),
    // AuthModule,
    // UsersModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [AuthConfig],
    // }),
    // CommandModule,
    // ScheduleModule.forRoot(),
    // TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserCommand, UsersService],
})
export class AppModule {}
