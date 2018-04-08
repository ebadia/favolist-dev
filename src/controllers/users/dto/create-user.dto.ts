import { IsString, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString() readonly first_name: string
  @IsString() readonly last_name: string
  @IsString() readonly mobile: string
  @IsOptional() @IsString() readonly phone: string
  @IsString() readonly email: string
  @IsString() readonly username: string
  @IsString() readonly password: string
}
