import {
  IsString,
  IsInt,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

import { AssignProductDto } from '../../products/dto/assign-product.dto'

export class UpdateAvailableDto {
  @IsOptional()
  @IsInt()
  readonly id: number
  @IsOptional()
  @IsString()
  readonly day: string
  @IsOptional()
  @IsNumber()
  readonly stock: number
  @IsOptional()
  @IsNumber()
  readonly stockOut: number
  @IsOptional()
  @IsNumber()
  readonly price: number
  @IsOptional()
  @IsNotEmpty()
  readonly product: AssignProductDto
}
