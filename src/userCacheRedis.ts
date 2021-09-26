import * as Redis from 'ioredis';
import { IUserStore } from './module';
export interface IRedisUserAuthCacheOptions {
  host: string;
  port: number;
  password?: string;
  db?: number;
  expireTime?: number;
}
export class RedisUserAuthCache implements IUserStore {
  public clientRedis: Redis.Redis;
  public options: any;
  constructor(options?: IRedisUserAuthCacheOptions) {
    const defaultOption: IRedisUserAuthCacheOptions = {
      host: '127.0.0.1',
      port: 6379,
      db: 1,
      expireTime: 3000,
    };
    this.options = Object.assign({}, defaultOption, options);
    this.clientRedis = new Redis({
      host: this.options.host,
      port: this.options.port,
      password: this.options.password,
      db: this.options.db,
    });
  }
  async get(key: string) {
    return await this.clientRedis.get(key);
  }
  async set(key: string, value: string) {
    try {
      await this.clientRedis.set(key, value, 'ex', this.options.expireTime);
      return key;
    } catch (e) {
      throw e;
    }
  }
  async getAll() {
    try {
      console.log('getAll');
    } catch (e) {
      throw e;
    }
  }
  async remove(key: string) {
    try {
      await this.clientRedis.del(key);
      return true;
    } catch (e) {
      throw e;
    }
  }
}
