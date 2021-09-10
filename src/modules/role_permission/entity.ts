import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { RequestMethod } from '@nestjs/common';
@Entity('admin_role_permission')
export class AdminRolePermissionEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_role_permission';
  // 权限名称
  @Column()
  role_id: number;

  @Column()
  permission_id: number;
}
