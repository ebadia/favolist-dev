import {
  IsString,
  IsInt,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

import { CreateItemDto } from '../../items/dto/create-item.dto'

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  readonly id: number

  @IsOptional()
  @IsString()
  readonly day: string

  @IsOptional()
  @IsString()
  readonly hour: string

  @IsOptional()
  @IsString()
  readonly status: string

  @IsOptional()
  @IsString()
  readonly place: string

  @IsOptional() readonly items: CreateItemDto[]
}
