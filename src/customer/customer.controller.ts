import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UnprocessableEntityException,
  Inject,
  forwardRef,
  UseGuards,
  Req,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { JwtPayload } from '../auth/jwt-payload';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserAuth } from '../auth/user-auth.decorator';
import {
  OrderPayloadDto,
  ValidateId,
  ValidateQuery,
} from '../order/dto/create-order.dto';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../order/schemas/order.schema';
import { ProductService } from '../product/product.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserRole } from './schemas/customer.schema';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'update order succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    // console.log(createCustomerDto)
    return this.customerService.addCustomer(createCustomerDto);
  }

  @Get()
  showCustomer() {
    return this.customerService.showCustomer();
  }

  @Get(':id')
  findCustomerById(@Param('id') id: string) {
    console.log(id);
    return this.customerService.findCustomerById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'update customer succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    console.log(id);
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    console.log(id);
    return this.customerService.deleteCustomer(id);
  }

  @Post('/shopping/')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'order succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async shopping(
    @Body() payload: OrderPayloadDto,
    @Req() req,
    @UserAuth() { sub: customerId }: JwtPayload,
  ) {
    // const customerId = userAuth.sub

    for (const lineItem of payload.line_items) {
      const variant = await this.productService.findVariant(lineItem.variantId);

      if (!variant) {
        throw new UnprocessableEntityException(
          `Not Found item ${lineItem.variantId}`,
        );
      }
      if (variant.quantity < lineItem.quantity) {
        throw new UnprocessableEntityException(
          `Quantity should not greater than inventory variantId: (${variant._id}) quantity: (${variant.quantity})`,
        );
      }
    }
    return await this.orderService.getOrderByVariantId(customerId, payload);
  }

  @Post('/payment/')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'payment succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async payment(
    @Query() query: ValidateQuery,
    @UserAuth() { sub: customerIdPayload }: JwtPayload,
  ) {
    const order = await this.orderService.findOrder(query.id);
    const status = order.status.toString();
    const customerId = order.customerId.toString();

    if (customerId !== customerIdPayload) {
      throw new ForbiddenException('This order not is your order!');
    }
    if (
      status === (OrderStatus.PAID || OrderStatus.CANCEL || OrderStatus.EXPIRED)
    ) {
      throw new UnprocessableEntityException(
        `This Order : ${query.id} staus : ${status}`,
      );
    }

    return await this.orderService.paymentMethod(query.id, query.pay);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'update order succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async updateOrder(
    @Query() order: ValidateId,
    @Body() updateOrderDto: OrderPayloadDto,
  ) {
    return await this.orderService.updateOrder(order.id, updateOrderDto);
  }

  @Patch('cancel')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'cancel order succeeded.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async cancelOrder(
    @Query() orderQuery: ValidateId,
    @UserAuth() { sub: customerIdPayload }: JwtPayload,
  ) {
    const order = await this.orderService.findOrder(orderQuery.id);
    const customerId = order.customerId.toString();

    if (customerId !== customerIdPayload) {
      throw new ForbiddenException("You can't cancel this order!");
    }
    return await this.orderService.cancelOrder(order.id);
  }
}
