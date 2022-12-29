import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginRequestDto, RegisterRequestDto } from '../dto/auth.dto';
import { Verification } from '../models/otp.model';
import { User } from '../models/user.model';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Op } from 'sequelize';
import { OtpDto } from '../dto/auth.dto';

export type UserFind = {
  userName?: string;
  phone?: string;
  email?: string;
  id?: string;
};

export type UserCheck = {
  userName?: string;
  phone?: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Verification) private verifyModel: typeof Verification,
  ) {}

  async signUp(data: RegisterRequestDto) {
    const encrypted = await hash(data.password, 10);

    const newUser = new this.userModel({
      userName: data.userName,
      password: encrypted,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
    });

    let checkedUser = await this.checkUser({
      userName: data.userName,
      phone: data.phone,
    });
    if ((checkedUser = true)) {
      newUser.save();
      let code = Math.floor(100000 + Math.random() * 900000);
      const newVerify = new this.verifyModel({
        userId: newUser.id,
        otp: code,
        sendDate: new Date(),
        usage: 'SignUp',
        isVerify: false,
      });
      newVerify.save();
      this.sendMessage(data.phone, code);
      return newUser;
    }
  }

  sendMessage(phone, otp) {
    axios({
      method: 'post',
      url: 'http://18.167.46.29:5010/sms/messagePro',
      data: {
        to: phone,
        text: 'Your verification code is ' + otp,
        systemId: 'DA22',
        countryCode: '+976',
      },
    });
  }

  async approveVerify(data: OtpDto) {
    let ver = await this.verifyModel.findOne({
      where: { userId: data.id },
      order: [['createdAt', 'DESC']],
    });

    if (ver.otp == data.otp && !ver.isVerify) {
      this.userModel.update(
        { status: 'Active' },
        { where: { id: ver.userId } },
      );
      ver.isVerify = true;
      ver.save();
    } else {
      return 'Wrong OTP code';
    }
  }

  async checkUser({ userName, phone }: UserCheck): Promise<any> {
    if (!!phone) {
      const checkPhone = await this.userModel.findOne({
        where: {
          phone: phone,
        },
      });
      if (!checkPhone) return true;
      throw new HttpException('PHONE_ALREADY_EXISTS', 400);
    }

    if (!!userName) {
      const checkPhone = await this.userModel.findOne({
        where: { username: userName },
      });
      if (!checkPhone) return true;
      throw new HttpException('PHONE_ALREADY_EXISTS', 400);
    }
    return true;
  }

  async signIn(data: LoginRequestDto) {
    const user = await this.userModel.findOne({
      where: {
        username: data.userName,
      },
    });
    const isPasswordMatching = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (isPasswordMatching) {
      const { access_token, refresh_token } = this.TokenGenerate(user.id);
      const {} = this.verifyModel.findOne({ where: { isVerify: true } });
      return {
        access_token,
        refresh_token,
      };
    }
    return 'User Not Found';
  }

  getUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  TokenGenerate(id: string, expiresIn: string = '24h') {
    const access_token = sign({ userId: id }, 'secret', { expiresIn: '15m' });
    const refresh_token = sign({ userId: id }, 'secret' + '_refresh', {
      expiresIn: expiresIn || '24h',
    });

    return {
      access_token,
      refresh_token,
    };
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { send } from 'process';
// import { connector } from '../../utils/connector';
// import { RegisterRequestDto } from './dto/auth.dto';
// import { User } from './models/user.model';

// @Injectable()
// export class AuthService {
//   constructor(@InjectModel(User) private userModel: typeof User) {}

//   async sendOtpWithAuthentication(credential: string, countryCode: string) {
//     const data = await connector({
//       microservice: 'auth',
//       url: '/auth/request/otp',
//       method: 'POST',
//       data: {
//         credential: credential,
//       },
//       headers: {
//         country: '+' + countryCode,
//       },
//     });
//     return data;
//   }

//   async registerToAuthentication({
//     countryCode,
//     userName,
//     phone,
//     password,
//     otp,
//     firstName,
//     lastName,
//   }) {
//     const data = await connector({
//       microservice: 'auth',
//       url: '/auth/register',
//       data: {
//         countryCode: '+' + countryCode,
//         phone: phone,
//         userName: userName,
//         password: password,
//         nickName: userName,
//         firstName: firstName,
//         lastName: lastName,
//       },
//       method: 'POST',
//       // headers: {
//       //   otp,
//       //   used: "phone",
//       // },
//     });
//     return data;
//   }

//   async loginToAuthentication({
//     credential,
//     password,
//   }: {
//     credential: string;
//     password: string;
//   }) {
//     const data = await connector({
//       microservice: 'auth',
//       url: '/auth/login',
//       method: 'POST',
//       data: {
//         credential,
//         password,
//       },
//     });
//     return data;
//   }

//   async forgotPassword({ credential }: { credential: string }) {
//     const data = await connector({
//       microservice: 'auth',
//       url: '/auth/change/request',
//       method: 'POST',
//       data: {
//         credential,
//       },
//     });
//     return data;
//   }
// wW
//   async changePasswordAccept({
//     credential,
//     password,
//     otp,
//   }: {
//     credential: string;
//     password: string;
//     otp: string;
//   }) {
//     const data = await connector({
//       microservice: 'auth',
//       url: '/auth/change/accept',
//       method: 'POST',
//       data: {
//         credential: credential,
//         password: password,
//         otp: otp,
//         code: otp,
//       },
//     });
//     return data;
//   }

//   async refreshToken({ refresh_token }: { refresh_token: string }) {
//     const data = await connector({
//       microservice: 'auth',
//       url: '/auth/refresh',
//       method: 'POST',
//       data: {
//         refresh_token,
//       },
//     });
//     return data;
//   }
// }
