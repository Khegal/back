import { ApiProperty } from '@nestjs/swagger';
import { int } from 'aws-sdk/clients/datapipeline';
import {
  IsDateString,
  IsIP,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PostVideoDto {
  @ApiProperty({
    example: 'Abc',
  })
  @IsString()
  @IsNotEmpty()
  video: string;

  @ApiProperty({
    example: 'Middle-schhol',
  })
  @IsString()
  @IsNotEmpty()
  gradeGroup: string;

  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  grade: number;

  @ApiProperty({
    example: 'Coding: Lesson one',
  })
  @IsString()
  @IsNotEmpty()
  VideoTitle: string;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  videoViews: number;

  @ApiProperty({
    example: 'Science',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  videoNum: number;

  @ApiProperty({
    example: 'Atoms',
  })
  @IsNotEmpty()
  @IsString()
  videoTitle: string;
}
