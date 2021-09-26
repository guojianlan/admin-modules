import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminUserEntity } from './entity';
import { AdminUserService } from './service';
import {
  LoginByEmailDto,
  LoginByUserNameDto,
  RegisterByEmailDto,
  RegisterByUserNameDto,
  SetUserRoleDto,
} from './dto';
import { Request, Response } from 'express';
import { AuthGuard, AuthPermissionGuard, PublicDecorator } from '../decorators';
const CrudController = WrapController({
  model: AdminUserEntity,
});
export interface AdminUserControllerImplements {
  loginByUsername: (body: any, ...args: any[]) => any;
  registerByUserName: (body: any, ...args: any[]) => any;
}
@Controller('admin/user')
export class AdminUserController
  extends CrudController
  implements AdminUserControllerImplements
{
  constructor(readonly service: AdminUserService) {
    super(service);
  }

  @Post('loginByEmail')
  loginByEmail(@Body() body: LoginByEmailDto) {
    return this.service.loginByEmail(body);
  }

  @Post('registerByEmail')
  registerByEmail(@Body() body: RegisterByEmailDto) {
    return this.service.registerByEmail(body);
  }
  @Post('loginByUserName')
  @PublicDecorator()
  async loginByUsername(
    @Body() body: LoginByUserNameDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
      res: Response,
  ) {
    await this.service.checkCode(body.code, req);
    const user = await this.service.loginByUsername(body);
    const token = await this.service.generateAuthToken(user);
    await this.service.deleteCaptcha(res);
    return token;
  }
  @AuthGuard()
  @Post('logout')
  async logout(@Req() req: any) {
    if (req.user == undefined) {
      throw new ForbiddenException();
    }
    return this.service.logout(req);
  }
  @Post('registerAdminUser')
  @PublicDecorator()
  async registerAdminUser(
    @Body() body: RegisterByUserNameDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
      res: Response,
  ) {
    //创建管理员
    const user = await this.service.find();
    if (user == undefined || user.list.length == 0) {
      await this.service.checkCode(body.code, req);
      await this.service.deleteCaptcha(res);
      return this.service.registerByUserName({
        ...body,
      });
    }
    return '超级管理员已存在';
  }
  @Post('registerByUserName')
  async registerByUserName(
    @Body() body: RegisterByUserNameDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
      res: Response,
  ) {
    await this.service.checkCode(body.code, req);
    await this.service.deleteCaptcha(res);
    return this.service.registerByUserName(body);
  }
  @Get('getCaptcha')
  @PublicDecorator()
  async getCaptcha(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const captcha = await this.service.getCaptcha();
    res.cookie('captcha', captcha.text);
    return captcha.data;
  }
  //设置用户角色
  @AuthPermissionGuard()
  @Post(':user_id/role')
  async setUserRole(
    @Param('user_id') user_id: number,
    @Body() body: SetUserRoleDto,
  ) {
    return await this.service.setUserRole(user_id, body);
  }
  @AuthPermissionGuard()
  @Get(':user_id/role')
  async getUserRole(@Param('user_id') user_id: number) {
    return await this.service.getUserRole(user_id);
  }
  //获取用户权限
  @AuthPermissionGuard()
  @Get(':user_id/permission')
  async getUserPermission(@Param('user_id') user_id: number) {
    return await this.service.getUserPermission(user_id);
  }

  //获取用户菜单
  @AuthPermissionGuard()
  @Get(':user_id/menu')
  async getUserMenu(@Param('user_id') user_id: number) {
    return await this.service.getUserMenu(user_id);
  }
}
