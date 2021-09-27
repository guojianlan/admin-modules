import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from '@guojian/nestjs-abstract-module';

@Entity('admin_role',{
  synchronize: false
})
export class AdminRoleEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_role';
  // 角色名称
  @Column()
  name: string;

  @Column({
    default: '',
  })
  description: string;
}
