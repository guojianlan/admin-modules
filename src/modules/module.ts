import { DynamicModule, Global, Module } from '@nestjs/common';
import { Param } from './types';
import { AdminUserController, AdminUserService, AdminUserEntity } from './user';
import { AdminRoleController, AdminRoleService, AdminRoleEntity } from './role';
import {
  AdminUserRoleController,
  AdminUserRoleService,
  AdminUserRoleEntity,
} from './user_role';

import {
  AdminPermissionController,
  AdminPermissionService,
  AdminPermissionEntity,
} from './permission';
import {
  AdminRolePermissionController,
  AdminRolePermissionService,
  AdminRolePermissionEntity,
} from './role_permission';
import { AdminMenuController, AdminMenuService, AdminMenuEntity } from './menu';
export const getAddProviders = () => {
  return {
    Controllers: {
      AdminUserRoleController,
      AdminUserController,
      AdminRoleController,

      AdminPermissionController,
      AdminRolePermissionController,
      AdminMenuController,
    },
    Services: {
      AdminUserRoleService,
      AdminUserService,
      AdminRoleService,

      AdminPermissionService,
      AdminRolePermissionService,
      AdminMenuService,
    },
    Entities: {
      AdminUserRoleEntity,
      AdminPermissionEntity,
      AdminUserEntity,
      AdminRoleEntity,
      AdminRolePermissionEntity,
      AdminMenuEntity,
    },
  };
};
@Global()
@Module({})
export class AdminModule {
  static forRootAsync(param: Param): DynamicModule {
    return {
      module: AdminModule,
      imports: param.imports,
      controllers: param && param.controllers,
      providers: param && param.providers,
      exports: [...param?.providers, ...param?.imports],
    };
  }
}
