import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ArrayUnique,
  IsEnum,
} from 'class-validator';
import { ALL_PERMISSIONS } from 'src/config/permissions';

export class RolesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(ALL_PERMISSIONS, { each: true })
  permisions: string[];

  @IsString()
  @IsNotEmpty()
  applicationId: string;
}

export type rolesType = typeof RolesDto;
