import { IJwtOptions } from './types';
import * as EventEmitter from 'events';
export const captchaList = {};

export class AdminStore {
  static caches: { [key: string]: any } = {};
  static getCaches(key: string) {
    return AdminStore.caches[key];
  }
  static setCaches(key: string, value: any) {
    AdminStore.caches[key] = value;
  }
  static getAllCaches() {
    return AdminStore.caches;
  }
}
export class JwtOptions {
  static options: IJwtOptions = {
    secret: 'asdhij',
  };
  static getOptions() {
    return JwtOptions.options;
  }
  static setOptions(data: IJwtOptions) {
    if (data) {
      JwtOptions.options = data;
    }
  }
}

class MyEmitter extends EventEmitter {}

export const myEmitterInstalled = new MyEmitter();
