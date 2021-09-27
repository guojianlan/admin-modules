import { Controller } from '@nestjs/common';
import { WrapController } from '@guojian/nestjs-abstract-module';
import { AdminRolePermissionEntity } from './entity';
import { AdminRolePermissionService } from './service';
import { AuthPermissionGuard } from '../decorators';
const CrudController = WrapController({
  model: AdminRolePermissionEntity,
});
@AuthPermissionGuard()
@Controller('admin/rolePermission')
export class AdminRolePermissionController extends CrudController {
  constructor(readonly service: AdminRolePermissionService) {
    super(service);
  }
}
