import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from '../../ab';

@Entity('admin_role')
export class AdminRoleEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_role';
  @Column()
  name: number;
}
