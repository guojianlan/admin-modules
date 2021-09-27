import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from '@guojian/nestjs-abstract-module';
import { AdminRoleEntity } from '../role';
import { AdminMenuEntity } from '../menu';
@Entity('admin_role_menu',{
  synchronize: false
})
export class AdminRoleMenuEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_role_menu';
  // 权限名称
  @Column()
  role_id: number;

  @Column()
  menu_id: number;

  role!: AdminRoleEntity;

  menu!: AdminMenuEntity;

  role_name!: string;

  menu_name!: string;
}
