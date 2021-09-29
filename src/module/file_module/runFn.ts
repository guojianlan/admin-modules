import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ModuleRef } from '@nestjs/core';
import { RootModule } from '../../app.module';
@Injectable()
export class RunFnGuard implements CanActivate {
  constructor(private moduleRef: ModuleRef) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    console.log(RootModule.install);
    const result = await GuardStore.inject(context, this.moduleRef);
    return result;
    return false;
  }
}

export const GuardStore: {
  inject: (context: ExecutionContext, moduleRef: ModuleRef) => Promise<boolean>;
} = {
  inject: async (context, moduleRef) => {
    return true;
  },
};
