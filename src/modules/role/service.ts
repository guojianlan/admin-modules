import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractServiceExtraOptions, AbstractTypeOrmService } from '../../ab';
import { Repository } from 'typeorm';
import { AdminRoleEntity } from './entity';
@Injectable()
export class AdminRoleService extends AbstractTypeOrmService<AdminRoleEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminRoleEntity)
    readonly repository: Repository<AdminRoleEntity>, // entity,
  ) {
    super(repository, AdminRoleEntity);
    this.options.deleteAfterAction = 'normal';
  }
  ttt() {
    console.log(AdminRoleEntity.__delete_table__);
  }
}
