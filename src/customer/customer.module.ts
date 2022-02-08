import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name , schema: CustomerSchema }]) ,
    forwardRef(() => ProductModule) ,
    forwardRef(() => OrderModule) ,
    AuthModule ,
  ],
  controllers: [CustomerController],
  providers: [CustomerService ],
  exports: [CustomerService],
})
export class CustomerModule {}
