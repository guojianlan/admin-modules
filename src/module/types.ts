import { AdminUserEntity } from './user';
import {ADMIN_GLOBAL} from "./global.var";

export interface IJwtOptions {
  secret?: string;
  [key: string]: any;
}

export interface Param {
  controllers: any[];
  providers: any[];
  imports: any[];
  inject: any[];
  useFactory: (...args: any[]) => void;
}
export interface IUserStore {
  get: (key: string) => Promise<any>;
  set: (key: string, value: string) => Promise<string>;
  remove: (key: string | string[]) => Promise<boolean>;
}

export enum RequestMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface ICustomReq {
  user: AdminUserEntity;
  public: boolean;
}

export interface IAdminGlobal{
  header_token:string
}