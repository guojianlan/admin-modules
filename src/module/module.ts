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
import {
  AdminRoleMenuController,
  AdminRoleMenuService,
  AdminRoleMenuEntity,
} from './role_menu';
import { AdminMenuController, AdminMenuService, AdminMenuEntity } from './menu';
import {ADMIN_PARAM_INIT_TOKEN, ADMIN_PARAM_TOKEN} from "./global.var";
export const getAddProviders = () => {
  return {
    Controllers: {
      AdminUserRoleController,
      AdminUserController,
      AdminRoleController,
      AdminPermissionController,
      AdminRolePermissionController,
      AdminMenuController,
      AdminRoleMenuController,
    },
    Services: {
      AdminUserRoleService,
      AdminUserService,
      AdminRoleService,
      AdminPermissionService,
      AdminRolePermissionService,
      AdminMenuService,
      AdminRoleMenuService,
    },
    Entities: {
      AdminUserRoleEntity,
      AdminPermissionEntity,
      AdminUserEntity,
      AdminRoleEntity,
      AdminRolePermissionEntity,
      AdminMenuEntity,
      AdminRoleMenuEntity,
    },
  };
};

@Global()
@Module({})
export class AdminModule {
  static forRootAsync(param: Param): DynamicModule {
    return {
      module: AdminModule,
      imports: [...param.imports],
      controllers: [...(param && param.controllers)],
      providers: [...(param && param.providers),{
        provide: ADMIN_PARAM_TOKEN,
        useValue: param,
      },
        {
          provide: ADMIN_PARAM_INIT_TOKEN,
          useFactory: async (...args) => {
            await param.useFactory(...args);
          },
          inject: [...param.inject],
        },],
      exports: [...param?.providers, ...param?.imports],
    };
  }
}
