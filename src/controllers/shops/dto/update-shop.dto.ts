import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

import { ShopUserDto } from '../../users/dto/shop-user.dto'

export class UpdateShopDto {
  @IsOptional() @IsInt() readonly id:number
  @IsOptional() @IsString() readonly name: string
  @IsOptional() @IsString() readonly nif: string
  @IsOptional() @IsString() readonly address: string
  @IsOptional() @IsString() readonly cp: string
  @IsOptional() @IsString() readonly city: string
  @IsOptional() @IsString() readonly state: string
  @IsOptional() @IsString() readonly phone: string
  @IsOptional() @IsString() readonly email: string
  @IsOptional() @IsString() readonly web: string
  @IsOptional() @IsString() readonly fb: string
  @IsOptional() readonly orders: any[]
  @IsOptional() @IsArray() readonly users: ShopUserDto[]
}
