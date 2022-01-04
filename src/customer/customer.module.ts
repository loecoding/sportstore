import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name , schema: CustomerSchema }]) 
    , forwardRef(() => ProductModule)
    , forwardRef(() => OrderModule)
  ],
  controllers: [CustomerController],
  providers: [CustomerService ],
  exports: [CustomerService],
})
export class CustomerModule {}
