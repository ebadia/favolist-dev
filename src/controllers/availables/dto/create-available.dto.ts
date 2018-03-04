import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

import { AssignProductDto } from '../../products/dto/assign-product.dto'

export class CreateAvailableDto {
  @IsOptional() @IsInt() readonly id: number
  @IsString() readonly day: string
  @IsNumber() readonly stock: number
  @IsNotEmpty() readonly product: AssignProductDto
}
