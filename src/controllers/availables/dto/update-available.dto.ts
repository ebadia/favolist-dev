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
  readonly availableStock: number
  @IsOptional()
  @IsNumber()
  readonly availableStockOut: number
  @IsOptional()
  @IsNumber()
  readonly price: number
  @IsOptional()
  @IsNotEmpty()
  readonly product: AssignProductDto
}
