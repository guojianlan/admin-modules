import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractServiceExtraOptions,
  AbstractTypeOrmService,
} from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminPermissionEntity } from './entity';
@Injectable()
export class AdminPermissionService extends AbstractTypeOrmService<AdminPermissionEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminPermissionEntity)
    readonly repository: Repository<AdminPermissionEntity>, // entity,
  ) {
    super(repository, AdminPermissionEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
}
