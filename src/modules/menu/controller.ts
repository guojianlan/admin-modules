import { Controller, Get } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminMenuEntity } from './entity';
import { AdminMenuService } from './service';
const CrudController = WrapController({
  model: AdminMenuEntity,
});
@Controller('admin/menu')
export class AdminMenuController extends CrudController {
  constructor(readonly service: AdminMenuService) {
    super(service);
  }
}
