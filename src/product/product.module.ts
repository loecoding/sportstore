import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule} from 'src/order/order.module';
import { CustomerModule } from 'src/customer/customer.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name , schema: ProductSchema }])
    , forwardRef(() => OrderModule)
    , forwardRef(() => CustomerModule)
  ],
  controllers: [ProductController],
  providers: [ProductService] ,
  exports: [ProductService],
})
export class ProductModule {}
