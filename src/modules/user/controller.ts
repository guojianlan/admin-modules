import { Controller, Get } from '@nestjs/common';
import { WrapController } from '../../ab';
import { AdminUserEntity } from './entity';
import { AdminUserService } from './service';
const CrudController = WrapController({
  model: AdminUserEntity,
});
@Controller('admin/user')
export class AdminUserController extends CrudController {
  constructor(readonly service: AdminUserService) {
    super(service);
  }
}
