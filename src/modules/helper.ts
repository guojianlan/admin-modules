export class UserAuthCache {
  public cacheList: Record<string, unknown>;
  static getInstall: UserAuthCache | null;
  static options: any;
  constructor(options?: any) {
    this.cacheList = {};
    UserAuthCache.options = options;
  }
  async init(options?: any) {
    console.log('init', 11111);
    if (!UserAuthCache.getInstall) {
      UserAuthCache.getInstall = new UserAuthCache(options);
    }
    return UserAuthCache.getInstall;
  }
  async changeOptions(options?: any) {
    if (!UserAuthCache.getInstall) {
      UserAuthCache.getInstall = await this.init();
    }
    UserAuthCache.options = options;
  }
  async get(key: string) {
    try {
      if (!UserAuthCache.getInstall) {
        UserAuthCache.getInstall = await this.init();
      }
      console.log(UserAuthCache.options);
      return UserAuthCache.getInstall.cacheList[key];
    } catch (e) {
      throw e;
    }
  }
  async set(key: string, value: string) {
    try {
      if (!UserAuthCache.getInstall) {
        UserAuthCache.getInstall = await this.init();
      }
      UserAuthCache.getInstall.cacheList[key] = value;
      return key;
    } catch (e) {
      throw e;
    }
  }
  async remote(key) {
    try {
      delete UserAuthCache.getInstall.cacheList[key];
    } catch (e) {
      UserAuthCache.getInstall.cacheList[key] = null;
      throw e;
    }
  }
}
