import { DynamicModule, Module } from '@nestjs/common';
import { Param } from './types';
import { UserController, UserService, UserEntity } from './user';
export const getAddProviders = () => {
  return {
    Controllers: {
      UserController,
    },
    Services: {
      UserService,
    },
    Entities: {
      UserEntity,
    },
  };
};
@Module({})
export class AdminModule {
  static forRootAsync(param: Param): DynamicModule {
    return {
      module: AdminModule,
      imports: param.imports,
      controllers: param && param.controllers,
      providers: param && param.providers,
    };
  }
}
