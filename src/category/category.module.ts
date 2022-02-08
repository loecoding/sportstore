import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CustomerModule } from '../customer/customer.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name , schema: CategorySchema }])
    , forwardRef(() => CustomerModule)
    , forwardRef(() => ProductModule)
  ],
  controllers: [CategoryController],
  providers: [CategoryService],

})
export class CategoryModule {}
