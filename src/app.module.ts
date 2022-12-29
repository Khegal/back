import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './resource/users/user.module';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { User } from './resource/users/models/user.model';
import { Verification } from './resource/users/models/otp.model';
import { Videos } from './resource/videos/models/videos.model';
import { VideosModule } from './resource/videos/videos.module';

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: 'files/',

    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuidv4()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '54.169.69.87',
      port: 3306,
      username: 'rtd',
      password: 'Tiny722$',
      database: 'new_project',
      models: [User, Verification, Videos],
    }),
    UserModule,
    VideosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
function uuidv4() {
  throw new Error('Function not implemented.');
}
