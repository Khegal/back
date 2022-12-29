import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordReqDto {
  @ApiProperty({
    example: '80208059',
  })
  @IsNumber()
  @MaxLength(10)
  phone: number;
}

export class ChangePasswordAcceptDto {
  @ApiProperty({
    example: '80208059',
  })
  @IsNumber()
  @MaxLength(32)
  phone: number;

  @ApiProperty({
    example: 'HelloWorld@123',
  })
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '908760',
  })
  otp: number;
}
