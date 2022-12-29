import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'Lola',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: '978|80208059',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone: string;

  @ApiProperty({
    example: 'tsa01@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Tiny722$',
  })
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @Matches('(?=.*?[#?!@$%^&*-])', '', {
    message: 'password must have a special character',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Namuun',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Boldbat',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class OtpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '95760064',
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    example: '121212',
  })
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}

export class CheckUserContact {
  @ApiProperty({ example: '976|80208059' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  phone: string;
}

export class RefreshToken {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class LoginRequestDto {
  @ApiProperty({
    example: 'Khegal',
  })
  @IsString()
  @MaxLength(32)
  userName: string;

  @ApiProperty({
    example: 'Tiny722$',
  })
  @IsString()
  @MaxLength(100)
  password: string;
}
