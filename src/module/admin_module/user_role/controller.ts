import { Controller } from '@nestjs/common';
import { WrapController } from '@guojian/nestjs-abstract-module';
import { AdminUserRoleEntity } from './entity';
import { AdminUserRoleService } from './service';
const CrudController = WrapController({
  model: AdminUserRoleEntity,
});
@Controller('admin/userRole')
export class AdminUserRoleController extends CrudController {
  constructor(readonly service: AdminUserRoleService) {
    super(service);
  }
}
