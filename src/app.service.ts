import { Injectable } from '@nestjs/common';
import { AdminUserService } from './modules/user';

@Injectable()
export class AppService {
  constructor(private readonly adminUserService: AdminUserService) {}
  async loginByUsername(body) {
    try {
      const result = await this.adminUserService.loginByUsername(body);
      return result;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }
}
