import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator'

export class UpdateItemDto {
  @IsOptional() @IsInt() readonly id: number
  @IsOptional() @IsInt() readonly quantity: number
  @IsOptional() @IsString() readonly status: string
  @IsOptional() @IsInt() readonly product: number
  @IsOptional() @IsInt() readonly order: number
}
