import { Controller } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminRolePermissionEntity } from './entity';
import { AdminRolePermissionService } from './service';
const CrudController = WrapController({
  model: AdminRolePermissionEntity,
});
@Controller('admin/rolePermission')
export class AdminRolePermissionController extends CrudController {
  constructor(readonly service: AdminRolePermissionService) {
    super(service);
  }
}
