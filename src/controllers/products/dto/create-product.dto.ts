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

  @IsOptional()
  @IsString()
  readonly name: string

  @IsOptional()
  @IsNumber()
  readonly price: number

  @IsOptional()
  @IsNotEmpty()
  readonly shop: AssignShopDto

  @IsOptional() readonly description: string

  @IsOptional() readonly image: string
}
