import { Controller } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminRoleMenuEntity } from './entity';
import { AdminRoleMenuService } from './service';
import { AuthPermissionGuard } from '../decorators';
const CrudController = WrapController({
  model: AdminRoleMenuEntity,
});
@AuthPermissionGuard()
@Controller('admin/role_menu')
export class AdminRoleMenuController extends CrudController {
  constructor(readonly service: AdminRoleMenuService) {
    super(service);
  }
}
