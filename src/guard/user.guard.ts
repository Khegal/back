import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { request } from 'http';
import { connector } from '../utils/connector';

@Injectable()
export class UserAccessGuard {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const header = request.headers.authorization;
    if (!header) return false;

    try {
      const user = await connector({
        microservice: 'auth',
        url: 'user/me',
        method: 'get',
        headers: {
          Authorization: header,
        },
      });
      console.log(user);
      request.user = user;
      return true;
    } catch (e) {
      return UnauthorizedException;
    }
  }
}
