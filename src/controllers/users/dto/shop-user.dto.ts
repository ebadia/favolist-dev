import { IsString, IsInt, IsOptional } from 'class-validator'

export class ShopUserDto {
  @IsOptional()
  @IsInt()
  readonly id: number
  @IsOptional()
  @IsString()
  readonly username: string
}
