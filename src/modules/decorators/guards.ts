import {
  Injectable,
  CanActivate,
  ExecutionContext,
  OnModuleInit,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminUserService, AdminUserEntity } from '../user';
import { ModuleRef, Reflector } from '@nestjs/core';
import { ICustomReq } from '../types';
@Injectable()
export class AdminAuthGuard implements CanActivate, OnModuleInit {
  private adminUserService: AdminUserService;
  constructor(private moduleRef: ModuleRef, private reflector: Reflector) {}
  async onModuleInit() {
    this.adminUserService = await this.moduleRef.get(AdminUserService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & ICustomReq>();
    const isPublic = this.reflector.get<any>('public', context.getHandler());
    if (isPublic) {
      return true;
    }
    const authorization = req.headers.authorization;
    if (authorization == undefined) {
      return false;
    }
    const [key, jwtToken] = authorization.split(' ');
    try {
      const jwt_data = await this.adminUserService.verifyJWT(jwtToken);
      const user = (await this.adminUserService.isExistUser(
        jwt_data.id,
      )) as AdminUserEntity;
      req.user = user;
    } catch (err) {
      return false;
    }
    return true;
  }
}
