import { Controller, Get } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminRoleEntity } from './entity';
import { AdminRoleService } from './service';
const CrudController = WrapController({
  model: AdminRoleEntity,
});
@Controller('admin/role')
export class AdminRoleController extends CrudController {
  constructor(readonly service: AdminRoleService) {
    super(service);
  }
  @Get('ttt')
  test() {
    this.service.ttt();
  }
}
