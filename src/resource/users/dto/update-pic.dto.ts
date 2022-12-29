import { ApiProperty } from '@nestjs/swagger';
import { url } from 'aws-sdk/clients/finspace';
import { File } from 'aws-sdk/clients/codecommit';

export class UpdatePicDto {
  @ApiProperty()
  profilePic: string;
}
