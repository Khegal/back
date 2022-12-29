import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { PostVideoDto } from './dto/videos.dto';
import { UserAccessGuard } from 'src/guard/user.guard';

@ApiTags('videos')
@Controller('video')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class VideosController {
  constructor(private readonly videoService: VideosService) {}

  @Get('video')
  @UseGuards(UserAccessGuard)
  videos() {
    return this.videoService.getVideo();
  }
}
