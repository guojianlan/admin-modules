import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractServiceExtraOptions, AbstractTypeOrmService } from 'nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminUserRoleEntity } from './entity';
@Injectable()
export class AdminUserRoleService extends AbstractTypeOrmService<AdminUserRoleEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminUserRoleEntity)
    readonly repository: Repository<AdminUserRoleEntity>, // entity,
  ) {
    super(repository, AdminUserRoleEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
}
