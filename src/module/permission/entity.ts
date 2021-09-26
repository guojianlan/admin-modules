import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { RequestMethods } from '../types';
import { IsNotEmpty } from 'class-validator';

@Entity('admin_permission',{
  synchronize: false
})
export class AdminPermissionEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_permission';
  // 权限名称
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    comment: 'url方法',
    enum: RequestMethods,
    default: RequestMethods.GET,
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
}
