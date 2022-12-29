import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreatedAt, Sequelize } from 'sequelize-typescript';
import { Verification } from './models/otp.model';
import { sign, verify } from 'jsonwebtoken';
import { access } from 'fs';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/auth.dto';
import { database } from 'firebase-admin';
import { GetUser } from './dto/users.dto';

export type UserFind = {
  username?: string;
  phone?: string;
  email?: string;
  id?: string;
};

export type UserCheck = {
  username?: string;
  phone?: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Verification) private verifyModel: typeof Verification,
  ) {}

  async getMe(data: GetUser) {
    const user = await this.userModel.findOne({
      where: {
        id: data.id,
      },
    });
    return user;
  }
}

// import { HttpException, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Model, Sequelize } from 'sequelize-typescript';
// import { UserUpdateDto } from './dto/user-update.dto';
// import { User } from './models/user.model';
// import { UpdatePicDto } from './dto/update-pic.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User) private userModel: typeof User,
//     private sequelize: Sequelize,
//   ) {
//     this.sequelize.sync();
//   }

//   async createUser({
//     id,
//     userName,
//     phone,
//     email,
//     firstName,
//     lastName,
//   }: UserCreateType) {
//     const user = new this.userModel({
//       id: id,
//       userName: userName,
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phone: phone,
//     });
//     user.save();
//     return user;
//   }

//   async getMe(userId) {
//     const user = await this.userModel.findOne({
//       where: {
//         id: userId,
//       },
//     });
//     return user;
//   }

//   async updateMe(
//     userId,
//     { firstName, lastName, gender, birthDate }: UserUpdateDto,
//   ) {
//     this.userModel.update(
//       {
//         firstName: firstName,
//         lastName: lastName,
//         gender: gender,
//         birthDate: birthDate,
//       },
//       {
//         where: { id: userId },
//       },
//     );
//     return 'user';
//   }
//   async updatePic(userId, { profilePic }: UpdatePicDto) {
//     this.userModel.update(
//       {
//         profilePic,
//       },
//       {
//         where: { id: userId },
//       },
//     );
//     return 'user';
//   }
// }

// export type UserCreateType = {
//   id: string;
//   userName: string;
//   phone: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// };

// export type UserUpdateType = {
//   firstName: string;
//   lastName: string;
// };
