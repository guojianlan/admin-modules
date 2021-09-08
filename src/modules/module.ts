import { DynamicModule, Module } from '@nestjs/common';
import { Param } from './types';
import { AdminUserController, AdminUserService, AdminUserEntity } from './user';
import { AdminRoleController, AdminRoleService, AdminRoleEntity } from './role';
import {
  AdminUserRoleController,
  AdminUserRoleService,
  AdminUserRoleEntity,
} from './user_role';
export const getAddProviders = () => {
  return {
    Controllers: {
      AdminUserController,
      AdminRoleController,
      AdminUserRoleController,
    },
    Services: {
      AdminUserService,
      AdminRoleService,
      AdminUserRoleService,
    },
    Entities: {
      AdminUserEntity,
      AdminRoleEntity,
      AdminUserRoleEntity,
    },
  };
};
@Module({})
export class AdminModule {
  static forRootAsync(param: Param): DynamicModule {
    console.log(param);
    return {
      module: AdminModule,
      imports: param.imports,
      controllers: param && param.controllers,
      providers: param && param.providers,
    };
  }
}
