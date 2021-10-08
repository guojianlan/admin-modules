import { DynamicModule, Module } from '@nestjs/common';
import { UserController, UserEntity, UserService } from './user';
import { Param } from './types';
@Module({})
export class UserModule {
  static async forRootAsync(param: Param): Promise<DynamicModule> {
    return {
      imports: [...(param.imports || [])],
      module: UserModule,
      controllers: [...(param.controllers || [])],
      providers: [
        {
          provide: 'aaaa',
          useFactory: async (...args) => {
            return await param.useFactory.apply(this, [
              UserController,
              UserService,
              UserEntity,
              ...args,
            ]);
          },
          inject: [...(param.inject || [])],
        },
        ...(param.providers || []),
      ],
    };
  }
}
export const UserBaseModule = {
  entities: [UserEntity],
  providers: [UserService],
  controllers: [UserController],
};
