import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';

@Entity('admin_role')
export class AdminRoleEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_role';
  @Column()
  name: string;
}
