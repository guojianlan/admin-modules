import { Controller } from '@nestjs/common';
import { WrapController } from '@guojian/nestjs-abstract-module';
import { AdminMenuEntity } from './entity';
import { AdminMenuService } from './service';
import { AuthPermissionGuard } from '../decorators';
import { myEmitterInstalled } from '../global.var';
const CrudController = WrapController({
  model: AdminMenuEntity,
  afterFunctions: {
    update: async function (result) {
      myEmitterInstalled.emit('menu_update', result);
      return result;
    },
  },
});
@AuthPermissionGuard()
@Controller('admin/menu')
export class AdminMenuController extends CrudController {
  constructor(readonly service: AdminMenuService) {
    super(service);
  }
}
