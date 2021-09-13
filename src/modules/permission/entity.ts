import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { RequestMethod } from '@nestjs/common';
@Entity('admin_permission')
export class AdminPermissionEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_permission';
  // 权限名称
  @Column()
  name: string;

  @Column({
    type: 'enum',
    comment: 'url方法',
    enum: RequestMethod,
    default: RequestMethod.GET,
  })
  method: string;

  @Column({
    comment: '请求的url',
  })
  uri: string;

  @Column({
    default: '',
  })
  description: string;

  test: string;
}
