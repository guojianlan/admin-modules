import { Controller, Get, Injectable, Module, Param } from '@nestjs/common';
import { UserController, UserService, UserEntity } from '../module/user_module';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Column, Entity, Repository } from 'typeorm';
@Entity('user')
export class ExtendEntity extends UserEntity {
  @Column()
  email: string;
}
@Injectable()
export class ExtendUserService extends UserService {
  constructor(
    @InjectRepository(ExtendEntity)
    readonly repository: Repository<ExtendEntity>,
  ) {
    super(repository);
  }
}
@Controller('user')
export class ExtendUserController extends UserController {
  constructor(readonly service: ExtendUserService) {
    super(service);
  }
  @Get(':id')
  //
  extendFindOne(@Param('id') id: number) {
    console.log('extendFindOne');
    return this.findOne(id);
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([ExtendEntity])],
  controllers: [ExtendUserController],
  providers: [ExtendUserService],
})
export class UserModule {}
