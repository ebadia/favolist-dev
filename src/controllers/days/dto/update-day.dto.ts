import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator'

export class UpdateDayDto {
  @IsOptional() @IsInt() readonly id: number
  @IsOptional() @IsInt() readonly code: number
  @IsOptional() @IsString() readonly name: string
  @IsOptional() @IsInt() readonly stock: number
  @IsOptional() @IsInt() readonly stockOut: number
  @IsOptional() @IsInt() readonly productId: number
}
