import { DynamicModule, Module } from '@nestjs/common';
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
      AdminUserController,
      AdminRoleController,
      AdminUserRoleController,
      AdminPermissionController,
      AdminRolePermissionController,
      AdminMenuController,
    },
    Services: {
      AdminUserService,
      AdminRoleService,
      AdminUserRoleService,
      AdminPermissionService,
      AdminRolePermissionService,
      AdminMenuService,
    },
    Entities: {
      AdminUserEntity,
      AdminRoleEntity,
      AdminUserRoleEntity,
      AdminPermissionEntity,
      AdminRolePermissionEntity,
      AdminMenuEntity,
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
