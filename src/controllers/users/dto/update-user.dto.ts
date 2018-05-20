import { IsString, IsInt, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsInt()
  readonly id: number
  @IsOptional()
  @IsString()
  readonly first_name: string
  @IsOptional()
  @IsString()
  readonly last_name: string
  @IsOptional()
  @IsString()
  readonly email: string
  @IsOptional()
  @IsString()
  readonly password: string
  @IsOptional() readonly orders: any[]
}
