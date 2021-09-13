import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { RequestMethod } from '@nestjs/common';
import { AdminRoleEntity } from '../role';
import { AdminPermissionEntity } from '../permission';
@Entity('admin_role_permission')
export class AdminRolePermissionEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_role_permission';
  // 权限名称
  @Column()
  role_id: number;

  @Column()
  permission_id: number;

  role!: AdminRoleEntity;

  permission!: AdminPermissionEntity;

  role_name!: string;

  permission_name!: string;
}
