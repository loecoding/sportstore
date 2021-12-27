import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CustomerModule ,ProductModule , OrderModule , CategoryModule , MongooseModule.forRoot('mongodb://localhost/mydb')],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
