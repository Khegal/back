import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { integer } from 'aws-sdk/clients/cloudfront';
import { int } from 'aws-sdk/clients/datapipeline';
import { Model, Sequelize } from 'sequelize-typescript';
import { PostVideoDto } from './dto/videos.dto';
import { Videos } from './models/videos.model';

// import { UpdatePicDto } from './dto/update-pic.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Videos) private videoModel: typeof Videos,
    private sequelize: Sequelize,
  ) {
    this.sequelize.sync();
  }

  async uploadVideo({
    id,
    gradeGroup,
    grade,
    subject,
    videoNum,
  }: VideoUploadType) {
    const Video = new this.videoModel({
      id: id,
      gradeGroup: gradeGroup,
      grade: grade,
      subject: subject,
      videoNum: videoNum,
    });
    Video.save();
    return Video;
  }

  async getVideo() {
    const Video = await this.videoModel.findAll();
    return Video;
  }

  async postVideo(VideoId: any, { videoTitle }: PostVideoDto) {
    this.videoModel.update(
      {
        videoTitle,
      },
      {
        where: { id: VideoId },
      },
    );
    return 'Video';
  }
}

export type VideoUploadType = {
  id: string;
  gradeGroup: string;
  grade: integer;
  subject: string;
  videoNum: integer;
};

export type PostVideo = {
  videoTitle: string;
  gradeGroup: string;
  videoViews: int;
  grade: int;
  subject: string;
  videoNum: int;
};
