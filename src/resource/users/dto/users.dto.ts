import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GetUser {
  @ApiProperty({
    example: 'Lola',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
