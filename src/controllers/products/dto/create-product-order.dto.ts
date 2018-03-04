import {
  IsString,
  IsInt,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

import { AssignShopDto } from '../../shops/dto/assign-shop.dto'

export class CreateProductOrderDto {
  @IsOptional()
  @IsInt()
  readonly id: number
  @IsOptional()
  @IsString()
  readonly name: string
}
