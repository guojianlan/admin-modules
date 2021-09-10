import { Controller } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminPermissionEntity } from './entity';
import { AdminPermissionService } from './service';

const CrudController = WrapController({
  model: AdminPermissionEntity,
});

@Controller('admin/permission')
export class AdminPermissionController extends CrudController {
  constructor(readonly service: AdminPermissionService) {
    super(service);
  }
}
