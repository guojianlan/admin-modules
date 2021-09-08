import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from '../../ab';
import { Repository } from 'typeorm';
import { AdminUserEntity } from './entity';
@Injectable()
export class AdminUserService extends AbstractTypeOrmService<AdminUserEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminUserEntity)
    readonly repository: Repository<AdminUserEntity>, // entity,
  ) {
    super(repository, AdminUserEntity, {
      deleteAfterAction: 'log_sql',
    });
  }
}
