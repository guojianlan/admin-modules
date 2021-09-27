import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractServiceExtraOptions,
  AbstractTypeOrmService,
} from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminRolePermissionEntity } from './entity';
@Injectable()
export class AdminRolePermissionService extends AbstractTypeOrmService<AdminRolePermissionEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminRolePermissionEntity)
    readonly repository: Repository<AdminRolePermissionEntity>, // entity,
  ) {
    super(repository, AdminRolePermissionEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
}
