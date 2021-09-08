import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity'
import {
    HocClass,
    InjectServiceClass,
    BaseServiceClass,
} from 'nestjs-abstract-module';

export class UserService extends BaseServiceClass<UserEntity>{
  
    protected constructor(repository:Repository<UserEntity>, entity) {
        super(repository, entity);
    }
    test(){
      return this._model.findOne()
    }
}

