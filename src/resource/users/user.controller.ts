import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserAccessGuard } from 'src/guard/user.guard';
import { UserService } from './user.service';
import { ApiHeader, ApiHeaders, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserUpdateDto } from './dto/user-update.dto';
import { UpdatePicDto } from './dto/update-pic.dto';
import { GetUser } from './dto/users.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @UseGuards(UserAccessGuard)
  getMe(@Body() getUser: GetUser) {
    return this.userService.getMe(getUser);
  }
}
