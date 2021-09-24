import * as EventEmitter from 'events';
import { UserAuthCache } from './helper';
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
export const Store: { userStore: UserAuthCache } = {
  userStore: undefined,
};

class MyEmitter extends EventEmitter {}

export const myEmitterInstalled = new MyEmitter();
