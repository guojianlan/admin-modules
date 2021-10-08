import { WrapController } from '@guojian/nestjs-abstract-module';
import { UserEntity } from './entity';
import { UserService } from './service';
import { Controller } from '@nestjs/common';
const CrudController = WrapController({
  model: UserEntity,
});
@Controller('user')
export class UserController extends CrudController {
  constructor(readonly service: UserService) {
    super(service);
  }
}
