import { IsNotEmpty, IsString } from 'class-validator';

export class ApplicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export type applicationType = typeof ApplicationDto;
