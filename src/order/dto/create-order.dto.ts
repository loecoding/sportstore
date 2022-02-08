import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNumberString } from 'class-validator';
export class CreateOrderDto {}

export class OrderPayloadDto {
  @ApiProperty()
  readonly line_items: LineItem[];
}
export class LineItem {
  @ApiProperty()
  readonly variantId: string;
  @ApiProperty()
  readonly quantity: number;
}
export class ValidateQuery {
  @ApiProperty()
  @IsMongoId()
  readonly id: string;
  @ApiProperty()
  @IsNumberString()
  readonly pay: number;
}

export class ValidateId {
  @ApiProperty()
  //   @IsMongoId()
  readonly id: string;
}
