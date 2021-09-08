import { Controller, Get } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { UserEntity } from './entity';
import { UserService } from './service';
const CrudController = WrapController({
  model: UserEntity,
});
@Controller('user')
export class UserController extends CrudController {
  constructor(readonly service: UserService) {
    super(service);
    console.log('install UserController');
  }
  @Get('ttt')
  getttt() {
    return this.service.findOne(1);
  }
}
