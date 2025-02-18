import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}