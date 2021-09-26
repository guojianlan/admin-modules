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
import {ADMIN_GLOBAL} from '../global.var'
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

    const auth_token = req.headers[ADMIN_GLOBAL.header_token || 'auth-token'];
    if (auth_token == undefined) {
      return false;
    }
    try {
      const auth_data = await this.adminUserService.verifyAuthToken(auth_token);
      if (auth_data == undefined || !auth_data) {
        return false;
      }
      const user = (await this.adminUserService.isExistUser(
        auth_data.id,
      )) as AdminUserEntity;
      console.log(user);
      req.user = user;
    } catch (err) {
      return false;
    }
    return true;
  }
}
