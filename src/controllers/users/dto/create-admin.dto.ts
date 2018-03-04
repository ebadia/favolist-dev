import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsInt() readonly id: number
  @IsOptional() @IsString() readonly username: string
}
