import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { OrderService } from '../order/order.service';
// import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Cron } from '@nestjs/schedule';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    // , private readonly productService: ProductService
    private readonly authService: AuthService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    /*Encryption
    const iv = randomBytes(16);
    const password = createCustomerDto.password.toString();
    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    const customerId = await this.customerModel.findOne({
      _id: '61f0de63437080abdb88dd13',
    });
    const str = encryptedText.toString('base64');

    const buf = Buffer.from(customerId.password.split(':')[0], 'base64');
    const ivbuf = Buffer.from(customerId.password.split(':')[1], 'base64');
    const decipher = createDecipheriv('aes-256-ctr', key, ivbuf);

    const decryptedText = Buffer.concat([
      decipher.update(buf),
      decipher.final(),
    ]);

    console.log({
      keystr: key.toString('base64'),
      decryptedTextToStr: decryptedText.toString(),
      pass: customerId.password,
    });
    const customer = await this.customerModel.findOne({
      username: createCustomerDto.username,
    });
    if (customer) {
      throw new BadRequestException('This username already used!');
    }
    return new this.customerModel({
      ...createCustomerDto,
      password: `${str}:${iv.toString('base64')}`,
    }).save();*/

    //Hashing
    return new this.customerModel({
      ...createCustomerDto,
      password: await this.authService.hash(createCustomerDto.password),
    }).save();
  }

  async showCustomer() {
    return this.customerModel.find();
  }

  async findCustomerById(id: string): Promise<Customer> {
    return this.customerModel.findOne({ _id: id });
  }

  async findOneByUsername(username: string): Promise<Customer> {
    return this.customerModel.findOne({ username });
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.updateOne(
      { _id: id },
      { $set: { ...updateCustomerDto } },
    );
  }

  async deleteCustomer(id: string) {
    return this.customerModel.deleteOne({ _id: id });
  }
}
