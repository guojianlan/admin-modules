import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { AdminUserEntity } from '../user';
import { AdminRoleEntity } from '../role';

@Entity('admin_user_role',{
  synchronize: false
})
export class AdminUserRoleEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_user_role';
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  // noinspection JSUnusedGlobalSymbols
  user: AdminUserEntity;

  // noinspection JSUnusedGlobalSymbols
  role: AdminRoleEntity;

  // noinspection JSUnusedGlobalSymbols
  role_name: string;
}
