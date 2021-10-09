import { WrapController } from '@guojian/nestjs-abstract-module';
import { UserEntity } from './entity';
import { UserService } from './service';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '../../admin_module/decorators';

const CrudController = WrapController({
  model: UserEntity,
  decorators: {
    findOne: [AuthGuard()],
  },
});
@Controller('user')
export class UserController extends CrudController {
  constructor(readonly service: UserService) {
    super(service);
  }
}
