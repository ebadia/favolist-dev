import {
  IsString,
  IsInt,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

import { AssignShopDto } from '../../shops/dto/assign-shop.dto'

export class CreateProductDto {
  @IsOptional()
  @IsInt()
  readonly id: number
  @IsString() readonly name: string
  @IsNumber() readonly price: number
  @IsNotEmpty() readonly shop: AssignShopDto
  @IsOptional() readonly description: string
  @IsOptional() readonly image: string
}
