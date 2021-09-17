import { Controller } from '@nestjs/common';
import { WrapController } from '../../ab';
import { AdminPermissionEntity } from './entity';
import { AdminPermissionService } from './service';
import { AuthPermissionGuard } from '../decorators';
import { myEmitterInstalled } from '../global.var';

const CrudController = WrapController({
  model: AdminPermissionEntity,
  afterFunctions: {
    update: function (result) {
      console.log(result);
      myEmitterInstalled.emit('permission_update', result.id);
      return result;
    },
  },
});
@AuthPermissionGuard()
@Controller('admin/permission')
export class AdminPermissionController extends CrudController {
  constructor(readonly service: AdminPermissionService) {
    super(service);
  }
}
