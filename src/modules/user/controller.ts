import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminUserEntity } from './entity';
import { AdminUserService } from './service';
import { AdminUserRoleEntity } from '../user_role';
import {
  LoginByEmailDto,
  LoginByUserNameDto,
  RegisterByEmailDto,
  RegisterByUserNameDto,
  SetUserRoleDto,
} from './dto';
import { Request, Response } from 'express';
import { captchaList } from '../global.var';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async loginByUsername(@Body() body: LoginByUserNameDto, @Req() req: Request) {
    await this.service.checkCode(body.code, req);
    return this.service.loginByUsername(body);
  }
  @Post('registerByUserName')
  async registerByUserName(
    @Body() body: RegisterByUserNameDto,
    @Req() req: Request,
  ) {
    await this.service.checkCode(body.code, req);
    return this.service.registerByUserName(body);
  }
  @Get('getCaptcha')
  async getCaptcha(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const captcha = await this.service.getCaptcha();
    captchaList[captcha.text] = true;
    res.cookie('captcha', captcha.text);
    console.log(captchaList);
    return captcha.data;
  }
  //设置用户角色
  @Post(':user_id/role')
  async setUserRole(
    @Param('user_id') user_id: number,
    @Body() body: SetUserRoleDto,
  ) {
    return await this.service.setUserRole(user_id, body);
  }

  @Get(':user_id/role')
  async getUserRole(
    @Param('user_id') user_id: number,
    @Body() body: SetUserRoleDto,
  ) {
    return await this.service.getUserRole(user_id);
  }
}
