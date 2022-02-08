import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { CustomerModule } from '../customer/customer.module';
import { ProductModule } from '../product/product.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name , schema: OrderSchema }])
    , forwardRef(() => CustomerModule)
    , forwardRef(() => ProductModule)
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
