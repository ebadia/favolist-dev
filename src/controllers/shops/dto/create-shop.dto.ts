import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

import { ShopUserDto } from '../../users/dto/shop-user.dto'

export class CreateShopDto {
  @IsOptional() @IsInt() readonly id: number
  @IsOptional() @IsString() readonly name: string
  @IsOptional() @IsArray() readonly users: ShopUserDto[]
}
