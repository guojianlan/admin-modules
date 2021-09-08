import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { IsEmail } from 'class-validator';
import { AdminUserEntity } from '../user';
import { AdminRoleEntity } from '../role';

@Entity('admin_user_role')
export class AdminUserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  user: AdminUserEntity[];

  role: AdminRoleEntity[];
}
