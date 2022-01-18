import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule} from 'src/order/order.module';
import { CustomerModule } from 'src/customer/customer.module';
import { CategoryModule } from 'src/category/category.module';
import { Variant, VariantSchema } from './schemas/variant.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name , schema: ProductSchema }]) ,
    MongooseModule.forFeature([{ name: Variant.name , schema: VariantSchema }])
    , forwardRef(() => OrderModule)
    , forwardRef(() => CustomerModule)
    , forwardRef(() => CategoryModule)
  ],
  controllers: [ProductController],
  providers: [ProductService] ,
  exports: [ProductService],
})
export class ProductModule {}
