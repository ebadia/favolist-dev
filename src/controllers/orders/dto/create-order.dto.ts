import { IsString, IsInt, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator'


export class CreateOrderDto {
  @IsOptional() @IsInt() readonly id: number
  @IsString() readonly day: string
  @IsString() readonly hour: string
  @IsString() readonly status: string
  @IsInt() readonly user: number
  @IsInt() readonly shop: number
}
