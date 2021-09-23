export class UserAuthCache {
  public cacheList: Record<string, unknown>;
  static getInstall: UserAuthCache | null;
  constructor() {
    this.cacheList = {};
  }
  async init() {
    console.log('init');
    return this;
  }
  async get(key: string) {
    if (UserAuthCache.getInstall) {
      UserAuthCache.getInstall = await this.init();
    } else {
      return UserAuthCache.getInstall.cacheList[key];
    }
  }
  async set(key: string, value: string) {
    this.cacheList[key] = value;
  }
  async remote() {
    console.log('remove');
  }
}
