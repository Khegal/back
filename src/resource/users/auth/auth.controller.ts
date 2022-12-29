import { Body, Controller, Headers, HttpException, Post } from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { request } from 'http';
import { AuthService } from './auth.service';
import {
  CheckUserContact,
  LoginRequestDto,
  RefreshToken,
  RegisterRequestDto,
} from '../dto/auth.dto';
import {
  ChangePasswordAcceptDto,
  ChangePasswordReqDto,
} from '../dto/forgot-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
// import { Body, Controller, Headers, HttpException, Post } from '@nestjs/common';
// import { ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
// import { request } from 'http';
// import { AuthService } from './auth.service';
// import {
//   CheckUserContact,
//   LoginRequestDto,
//   RefreshToken,
//   RegisterRequestDto,
// } from './dto/auth.dto';
// import {
//   ChangePasswordAcceptDto,
//   ChangePasswordReqDto,
// } from './dto/forgot-password.dto';
// import { UserService } from './user.service';

// @ApiTags('Authentication')
// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//   ) {}

//   @Post('check')
//   async checkPhoneNumber(@Body() { phone }: CheckUserContact) {
//     const [countryCode, numberCode] = phone.split('|');
//     if (!countryCode || !numberCode)
//       throw new HttpException('Phone_number_error', 444);
//     console.log('uhdyeg');
//     const authRes = await this.authService.sendOtpWithAuthentication(
//       numberCode,
//       countryCode,
//     );
//     console.log('uhdyeg');
//     return {
//       success: true,
//       message: authRes.message,
//     };
//   }

//   @Post('register')
//   async registerUser(
//     @Body()
//     {
//       otp,
//       userName,
//       password,
//       phone,
//       firstName,
//       lastName,
//       email,
//     }: RegisterRequestDto,
//   ) {
//     const [countryCode, numberCode] = phone.split('|');
//     if (!countryCode || !numberCode)
//       throw new HttpException('Phone_number_error', 400);

//     userName = userName.replace(/\s/g, '_');

//     if (!otp || otp.length != 6) throw new HttpException('OTP_NOT_VALID', 400);

//     const userAuth = (await this.authService.registerToAuthentication({
//       countryCode,
//       userName,
//       password,
//       phone: numberCode,
//       otp,
//       firstName,
//       lastName,
//     })) as {
//       user: { phone: string; email: string; id: string };
//       tokens: { access_token: string; refresh_token: string };
//     };

//     await this.userService.createUser({
//       id: userAuth.user.id,
//       userName: userName,
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phone: numberCode,
//     });

//     return {
//       success: true,
//       ...userAuth.tokens,
//     };
//   }

//   @Post('login')
//   async loginRequest(@Body() { credential, password }: LoginRequestDto) {
//     const tokens = await this.authService.loginToAuthentication({
//       credential,
//       password,
//     });
//     return {
//       refreshToken: tokens.refresh_token,
//       accessToken: tokens.access_token,
//     };
//   }

//   @Post('change-request')
//   async changeRequest(@Body() { credential }: ChangePasswordReqDto) {
//     return this.authService.forgotPassword({
//       credential,
//     });
//   }

//   @Post('change-accept')
//   async changeAccept(
//     @Body() { credential, password, otp }: ChangePasswordAcceptDto,
//   ) {
//     return this.authService.changePasswordAccept({
//       credential,
//       password,
//       otp,
//     });
//   }

//   @Post('refresh')
//   async refreshToken(@Body() { refreshToken }: RefreshToken) {
//     const { refresh_token, access_token } = await this.authService.refreshToken(
//       { refresh_token: refreshToken },
//     );

//     return {
//       refreshToken: refresh_token,
//       accessToken: access_token,
//     };
//   }
// }
