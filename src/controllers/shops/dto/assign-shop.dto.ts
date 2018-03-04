import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

export class AssignShopDto {
  @IsInt() readonly id: number
  @IsOptional() @IsString() readonly name: string
}
