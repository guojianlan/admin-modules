import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminUserService } from '../user';
import { Reflector } from '@nestjs/core';
import { ICustomReq } from '../types';
@Injectable()
export class AdminPermissionGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AdminUserService))
    private adminUserService: AdminUserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<any>('public', context.getHandler());
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request & ICustomReq>();
    //获取权限，如果是超级管理员，直接pass
    try {
      if (req.user.is_super) {
        return true;
      }
      const permissions = await this.adminUserService.getUserPermission(
        req.user.id,
      );
      if (permissions.length == 0) {
        return false;
      }
      const urls = permissions.reduce((pre, item) => {
        pre[item.uri] = item.method;
        return pre;
      }, {});
      return urls[req.route.path] == Object.keys(req.route.methods)[0];
      //获取所有的权限，判断url是否在里面，如果没有则没有权限访问
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
