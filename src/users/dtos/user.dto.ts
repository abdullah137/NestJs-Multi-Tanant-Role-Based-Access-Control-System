import {
  IsString,
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  applicationId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  initialUser?: boolean;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  applicationId: string;
}

export class AssignRoleToUserDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
