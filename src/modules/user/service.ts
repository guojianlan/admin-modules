import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from 'nestjs-abstract-module';
import { Repository } from 'typeorm';
import { UserEntity } from './entity';
@Injectable()
export class UserService extends AbstractTypeOrmService<UserEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(UserEntity)
    readonly repository: Repository<UserEntity>, // entity,
  ) {
    super(repository, UserEntity);
  }
}
