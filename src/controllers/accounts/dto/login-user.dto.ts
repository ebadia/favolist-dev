import { IsString, IsInt, MinLength, MaxLength, IsNumber, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string

  @IsEmail()
  @IsNotEmpty()
  readonly username: string
}
