import { Module } from '@nestjs/common';
import { AdminUserController, AdminUserService, AdminUserEntity } from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserRoleEntity } from '../user_role';
import { AdminPermissionEntity } from '../permission';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUserEntity,
      AdminUserRoleEntity,
      AdminPermissionEntity,
    ]),
  ],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
