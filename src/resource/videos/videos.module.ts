import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Videos } from './models/videos.model';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [SequelizeModule.forFeature([Videos])],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
