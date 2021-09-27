import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractServiceExtraOptions,
  AbstractTypeOrmService,
} from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminRoleMenuEntity } from './entity';
@Injectable()
export class AdminRoleMenuService extends AbstractTypeOrmService<AdminRoleMenuEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminRoleMenuEntity)
    readonly repository: Repository<AdminRoleMenuEntity>, // entity,
  ) {
    super(repository, AdminRoleMenuEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
}
