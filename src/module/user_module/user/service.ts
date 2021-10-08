import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { UserEntity } from './entity';

@Injectable()
export class UserService extends AbstractTypeOrmService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly repository: Repository<UserEntity>, // entity,
  ) {
    super(repository, UserEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
}
