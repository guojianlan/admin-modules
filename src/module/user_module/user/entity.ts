import { AbstractTypeEntity } from '@guojian/nestjs-abstract-module';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends AbstractTypeEntity {
  @Column()
  name: string;
}
