import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
  OnModuleInit,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminUserService } from './user';
import { ModuleRef } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  private adminUserService: AdminUserService;
  constructor(private moduleRef: ModuleRef) {}
  async onModuleInit() {
    this.adminUserService = await this.moduleRef.get(AdminUserService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    if (authorization == undefined) {
      return false;
    }
    const [key, jwtToken] = authorization.split(' ');
    try {
      const jwt_data = await this.adminUserService.verifyJWT(jwtToken);
      await this.adminUserService.isExistUser(jwt_data.id);
    } catch (err) {
      return false;
    }
    return true;
  }
}
