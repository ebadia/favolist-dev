import {
  IsString,
  IsInt,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty
} from 'class-validator'

export class AssignProductDto {
  @IsInt() readonly id: number
  @IsOptional()
  @IsString()
  readonly name: string
  @IsOptional()
  @IsNumber()
  readonly price: number
}
