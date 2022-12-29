import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIP,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    example: 'Batjin',
  })
  @IsString()
  @MaxLength(32)
  firstName: string;

  @ApiProperty({
    example: 'Boldbat',
  })
  lastName: string;

  @ApiProperty({
    example: 'Boldbat',
  })
  gender: string;

  @ApiProperty({
    example: 'Boldbat',
  })
  birthDate: string;
}
