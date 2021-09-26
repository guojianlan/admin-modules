import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { isEmail, IsNotEmpty } from 'class-validator';

@Entity('admin_menu',{
  synchronize: false
})
export class AdminMenuEntity extends AbstractTypeEntity {
  static __delete_table__ = 'del_admin_menu';
  // 菜单名称
  @Column()
  name: string;

  // 菜单url
  @IsNotEmpty()
  @Column()
  url: string;

  @Column({
    default: '',
  })
  description: string;
}