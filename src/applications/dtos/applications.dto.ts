import { IsNotEmpty, IsString } from 'class-validator';

export class ApplicationDto {
  @IsNotEmpty()
  name: string;
}

export type applicationType = typeof ApplicationDto;
