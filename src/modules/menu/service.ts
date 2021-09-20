import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  AbstractTypeOrmService } from 'nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminMenuEntity } from './entity';
@Injectable()
export class AdminMenuService extends AbstractTypeOrmService<AdminMenuEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminMenuEntity)
    readonly repository: Repository<AdminMenuEntity>, // entity,
  ) {
    super(repository, AdminMenuEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
  gg(){
    console.log(123);
  }
}
