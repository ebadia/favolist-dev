import { IsString, IsInt, IsOptional } from 'class-validator'

export class AddRoleDto {
  @IsOptional()
  @IsInt()
  readonly id: number
  @IsOptional()
  @IsString()
  readonly name: string
}
