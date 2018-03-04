import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator'

import { CreateProductOrderDto } from '../../products/dto/create-product-order.dto'

export class CreateItemDto {
  @IsOptional() @IsInt() readonly id: number
  @IsInt() readonly quantity: number
  @IsOptional() @IsString() readonly status: string
  readonly product: CreateProductOrderDto
  @IsOptional() @IsInt() readonly order: number
}
