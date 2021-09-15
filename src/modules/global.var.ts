export const captchaList = {};

export class AdminStore {
  static caches: { [key: string]: any } = {};
  static getCaches(key: string) {
    return AdminStore.caches[key];
  }
  static setCaches(key: string, value: any) {
    AdminStore.caches[key] = value;
  }
}