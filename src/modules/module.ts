import { DynamicModule, Global, Module } from '@nestjs/common';
import { Param } from './types';
import { Store } from './global.var';
import { UserAuthCache } from './helper';
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
  static async forRootAsync(param: Param): Promise<DynamicModule> {
    console.log(param);
    return {
      module: AdminModule,
      imports: [...param.imports],
      controllers: [...(param && param.controllers)],
      providers: [
        ...(param && param.providers),
        {
          provide: 'PARAM_ASYNC_ADMIN_PARAM',
          useValue: param,
        },
        {
          provide: 'PARAM_ASYNC_ADMIN_INIT',
          useFactory: async (...args) => {
            console.log(args);
            await param.useFactory();
            // if (param.UserStore?.classObject) {
            //   Store.userStore = new param.UserStore.classObject(
            //     param.UserStore?.options,
            //   );
            // } else {
            //   Store.userStore = new UserAuthCache(param.UserStore?.options);
            // }
            // await Store.userStore.init(param.UserStore?.options);
          },
          inject: [...param.inject],
        },
      ],
      exports: [...param?.providers, ...param?.imports],
    };
  }
  constructor() {
    console.log(123123);
  }
}
