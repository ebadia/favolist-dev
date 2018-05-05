import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator'

export class CreateDayDto {
  @IsOptional() @IsInt() readonly id: number
  @IsInt() readonly code: number
  @IsOptional() @IsString() readonly name: string
  @IsOptional() @IsInt() readonly stock: number
  @IsOptional() @IsInt() readonly stockOut: number
  @IsOptional() @IsInt() readonly productId: number
}
