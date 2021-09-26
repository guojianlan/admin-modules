import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AdminAuthGuard } from './guards';
import { AdminPermissionGuard } from './permission_guard';
import { PublicGuard } from './piblic_guard';
export const AuthGuard = () => {
  return applyDecorators(UseGuards(AdminAuthGuard));
};
export const AuthPermissionGuard = () => {
  return applyDecorators(UseGuards(AdminAuthGuard, AdminPermissionGuard));
};
export const PublicDecorator = (flag = true) => {
  return applyDecorators(SetMetadata('public', flag));
};
export default {
  AdminAuthGuard,
  AdminPermissionGuard,
  PublicGuard,
  AuthGuard
};
