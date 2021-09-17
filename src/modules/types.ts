import { AdminUserEntity } from './user';

export interface IJwtOptions {
  secret?: string;
  [key: string]: any;
}

export interface Param {
  controllers: any[];
  providers: any[];
  imports: any[];
  jwtOptions?: IJwtOptions;
}

export enum RequestMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface ICustomReq {
  user: AdminUserEntity;
  public:boolean
}
