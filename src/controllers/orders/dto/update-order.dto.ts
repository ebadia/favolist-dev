import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator'

export class UpdateOrderDto {
  @IsOptional() @IsInt() readonly id: number
  @IsOptional() @IsString() readonly day: string
  @IsOptional() @IsString() readonly hour: string
  @IsOptional() @IsString() readonly status: string
}
