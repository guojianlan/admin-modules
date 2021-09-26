import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from 'nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminUserEntity, isMatchPassword } from './entity';
import {
  LoginByEmailDto,
  LoginByUserNameDto,
  RegisterByEmailDto,
  RegisterByUserNameDto,
} from './dto';
import { isEmail } from 'class-validator';
import * as svgCaptcha from 'svg-captcha';
import * as bcrypt from 'bcrypt';
import { parse } from 'querystring';
import { captchaList, Store } from '../global.var';
import { Request, Response } from 'express';
import { AdminUserRoleEntity } from '../user_role';
import { AdminPermissionEntity } from '../permission';
import { generateHash } from '../helper';
@Injectable()
export class AdminUserService extends AbstractTypeOrmService<AdminUserEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminUserEntity)
    readonly repository: Repository<AdminUserEntity>, // entity,
    @InjectRepository(AdminUserRoleEntity)
    readonly user_role_repository: Repository<AdminUserRoleEntity>,
    @InjectRepository(AdminPermissionEntity)
    readonly permission_repository: Repository<AdminPermissionEntity>,
  ) {
    super(repository, AdminUserEntity, {
      deleteAfterAction: 'log_sql',
    });
    console.log('installer........');
  }
  public async __loginByEmail(body: LoginByEmailDto) {
    //判断邮箱是否存在
    //判断是邮箱还是手机
    const builder = this.queryBuilder();
    await this.addDeleteCondition(builder);
    builder.andWhere({
      email: body.email,
    });
    const user = await builder.getOne();
    if (user === undefined) {
      throw new BadRequestException('用户名或密码错误');
    }
    if (!isMatchPassword(body.password, user.password)) {
      throw new BadRequestException('用户名或密码错误');
    }
    delete user.password;
    return user;
    //判断密码
    //返回用户id
    //前端保存
    return body;
  }
  public async loginByEmail(body: LoginByEmailDto) {
    return this.__loginByEmail(body);
  }

  public async __registerByEmail(body: LoginByEmailDto) {
    //判断邮箱是否存在
    const builder = this.queryBuilder();

    builder.andWhere({
      email: body.email,
    });
    const user = await builder.getOne();
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    const result = (await this.create(body)) as unknown as AdminUserEntity;
    if (result) {
      return true;
    }
    return false;
  }
  public async registerByEmail(body: RegisterByEmailDto) {
    return this.__registerByEmail(body);
  }
  public async loginByUsername(body: LoginByUserNameDto) {
    return await this.__loginByUsername(body);
  }
  public async __loginByUsername(body: LoginByUserNameDto) {
    const builder = this.queryBuilder();
    await this.addDeleteCondition(builder);
    if (isEmail(body.username)) {
      builder.andWhere({ email: body.username });
    } else {
      builder.andWhere({ mobile: body.username });
    }
    const user = await builder.getOne();
    if (user === undefined) {
      throw new BadRequestException('用户名或密码错误');
    }
    if (!isMatchPassword(body.password, user.password)) {
      throw new BadRequestException('用户名或密码错误');
    }
    delete user.password;
    return user;
  }
  public async registerByUserName(body: RegisterByUserNameDto) {
    return this.__registerByUserName(body);
  }
  public async __registerByUserName(body: RegisterByUserNameDto) {
    const builder = this.queryBuilder();
    await this.addDeleteCondition(builder);
    if (isEmail(body.username)) {
      builder.andWhere({ email: body.username });
      (body as any).email = body.username;
    } else {
      builder.andWhere({ mobile: body.username });
      (body as any).mobile = body.username;
    }
    const user = await builder.getOne();
    console.log(user);
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    try {
      const result = (await this.create(body)) as unknown as AdminUserEntity;
      delete result.password;
      return result;
    } catch (error) {
      this.options.logger(error);
      throw new BadRequestException('未知错误');
    }
  }
  public async getCaptcha() {
    const captcha = svgCaptcha.create({
      // 翻转颜色
      inverse: false,
      // 字体大小
      fontSize: 36,
      // 噪声线条数
      noise: 2,
      // 宽度
      width: 120,
      // 高度
      height: 40,
    });
    captcha.text = bcrypt.hashSync(captcha.text.toLocaleLowerCase(), 8);
    // console.log(
    //   jwt.verify(
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiY3RpbWUiOjE2MzEyOTEwMzcsIm10aW1lIjoxNjMxMjkxMDM3LCJkdGltZSI6MCwibW9iaWxlIjoiMTU5MjAxMTI4NjEiLCJlbWFpbCI6IjQyNDEyMjIzOTc3MjI3QHFxLmNvbSIsImlhdCI6MTYzMTc1MjQzNX0.jnKy6qyahqYivWYcIlkbd05xzm_jCeIUFOWoSLdw9kc',
    //     JwtOptions.getOptions().secret,
    //   ),
    // );
    return captcha;
  }
  public async validateCaptcha(code: string, hash: string): Promise<boolean> {
    const flag = await bcrypt.compare(code.toLocaleLowerCase(), hash || '');
    return flag;
  }
  public async checkCode(code: string, req: Request) {
    const cookies = parse(req.headers.cookie);
    const captcha = cookies?.captcha;
    if (captcha == undefined) {
      throw new BadRequestException('请获取验证码');
    }
    // if (!captchaList[captcha as string]) {
    //   throw new BadRequestException('验证码不存在');
    // }
    if (!(await this.validateCaptcha(code, captcha as string))) {
      throw new BadRequestException('验证码错误');
    }
    // delete captchaList[captcha as string];
  }
  public async deleteCaptcha(res: Response) {
    res.cookie('captcha', '', { maxAge: 0 });
  }
  public async isExistUser(id) {
    return await this.findOne(id);
  }
  public async setUserRole(user_id: number, body: any) {
    const user = await this.isExistUser(user_id);
    if (user) {
      //删除所有的role,然后添加
      await this.user_role_repository.delete({ user_id: user_id });
      const data = body.role_ids.map((item) => ({
        user_id: user_id,
        role_id: item,
      }));
      const entityData = this.user_role_repository.create(data);
      const resultData = await this.user_role_repository.insert(entityData);
      if (!resultData) {
        throw new BadRequestException('插入失败');
      }
      return true;
    }
    return false;
  }
  public async getUserRole(user_id: number) {
    const builder = this.user_role_repository.createQueryBuilder('user_role');
    builder.leftJoin(
      // 'user_role.role',
      'admin_role',
      'role',
      'user_role.role_id = role.id',
    );
    // builder.select('role.name', 'user_role.name');
    // builder.select(['user_role', 'role.name']);
    builder.select('role.*');
    builder.groupBy('id');
    builder.where({
      user_id,
    });
    builder.andWhere('role.id > 0');
    const result = await builder.getRawMany<AdminUserRoleEntity>();
    return result;
  }
  public async getUserPermission(user_id: number) {
    const user = await this.isExistUser(user_id);
    if (user) {
      const builder = this.user_role_repository.createQueryBuilder('user_role');
      builder.leftJoin(
        'admin_role_permission',
        'role_permission',
        'role_permission.role_id = user_role.role_id',
      );
      builder.leftJoin(
        'admin_permission',
        'permission',
        'permission.id = role_permission.permission_id',
      );
      const field = [];
      Object.values(this.permission_repository.metadata.propertiesMap).forEach(
        (item) => {
          field.push(`permission.${item} as ${item}`);
        },
      );
      builder.select([...field]);
      builder.where({
        user_id,
      });
      builder.andWhere('permission.id > 0');
      builder.groupBy('id');
      const result = (await builder.getRawMany()) as AdminPermissionEntity[];
      return result;
    }
    return [];
  }
  public async getUserMenu(user_id: number) {
    const user = await this.isExistUser(user_id);
    if (user) {
      const builder = this.user_role_repository.createQueryBuilder('user_role');
      builder.leftJoin(
        'admin_role_menu',
        'role_menu',
        'role_menu.role_id = user_role.role_id',
      );
      builder.leftJoin('admin_menu', 'menu', 'menu.id = role_menu.menu_id');
      const field = [];
      builder.select(['menu.*']);
      builder.where({
        user_id,
      });
      builder.andWhere('menu.id is not null');
      builder.groupBy('id');
      const result = await builder.getRawMany();
      return result;
    }
    return [];
  }
  public async logout(req: Request) {
    const auth_token = req.headers['auth-token'];
    if (auth_token) {
      if (await Store.userStore.remove(auth_token)) {
        return true;
      }
    } else {
      return false;
    }
  }
  public async generateAuthToken(data: any) {
    const payload = Object.assign({}, data);
    const token = await Store.userStore.set(
      generateHash(),
      JSON.stringify({
        id: payload.id,
      }),
    );
    return token;
  }
  public async verifyAuthToken(token) {
    try {
      const value = (await Store.userStore.get(token)) as string;
      return JSON.parse(value);
    } catch (e) {
      throw e;
    }
  }
}
