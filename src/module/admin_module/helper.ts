import * as crypto from 'crypto';
export class UserAuthCache {
  public cacheList: Record<string, unknown>;
  public options: any;
  constructor(options?: any) {
    this.cacheList = {};
    this.options = options;
  }
  async get(key: string) {
    try {
      return this.cacheList[key];
    } catch (e) {
      throw e;
    }
  }
  async getAll() {
    try {
      return this.cacheList;
    } catch (e) {
      throw e;
    }
  }
  async set(key: string, value: string) {
    try {
      this.cacheList[key] = value;
      return key;
    } catch (e) {
      throw e;
    }
  }
  async remove(key) {
    try {
      delete this.cacheList[key];
      return true;
    } catch (e) {
      this.cacheList[key] = null;
      throw e;
    }
  }
}

export const generateHash = (len=10) => {
  return generateSha1(randomString(len));
};
export const randomString = (len = 10) => {
  return Math.random().toString(32).substr(2, len) + randomString2();
};

export const randomString2 = (len = 6, charSet?: string) => {
  const chars =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomStr;
};
export const generateSha1 = (str: string) => {
  const sha1 = crypto.createHash('sha1');
  sha1.update(str);
  return sha1.digest('hex');
};
