import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from 'nestjs-abstract-module';
import { Repository } from 'typeorm';
import { AdminRoleEntity } from './entity';
import { AdminRolePermissionEntity } from '../role_permission';
import { SetRoleMenuDto, SetRolePermissionDto } from './dto';
import { AdminRoleMenuEntity } from '../role_menu';
import { AdminStore } from '../global.var';
@Injectable()
export class AdminRoleService extends AbstractTypeOrmService<AdminRoleEntity> {
  // entity: UserEntity;
  constructor(
    @InjectRepository(AdminRoleEntity)
    readonly repository: Repository<AdminRoleEntity>, // entity,
    @InjectRepository(AdminRolePermissionEntity)
    readonly role_permission_repository: Repository<AdminRolePermissionEntity>,
    @InjectRepository(AdminRoleMenuEntity)
    readonly role_menu_repository: Repository<AdminRoleMenuEntity>,
  ) {
    super(repository, AdminRoleEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
  public async isExistRole(id) {
    return await this.findOne(id);
  }
  public async setRolePermission(role_id: number, body: SetRolePermissionDto) {
    const user = await this.isExistRole(role_id);
    if (user) {
      //删除所有的permission,然后添加
      await this.role_permission_repository.delete({ role_id });
      AdminStore.setCaches(`role_permission_${role_id}`, null);
      const data = body.permission_ids.map((item) => ({
        role_id: role_id,
        permission_id: item,
      }));
      const entityData = this.role_permission_repository.create(data);
      const resultData = await this.role_permission_repository.save(entityData);
      if (!resultData) {
        throw new BadRequestException('插入失败');
      }
      AdminStore.setCaches(
        `role_permission_${role_id}`,
        JSON.stringify(resultData.map((item) => item.permission_id)),
      );
      return true;
    }
    return false;
  }
  public async getRolePermission(role_id: number) {
    console.log(AdminStore.getCaches(`'role_permission_${role_id}`));
    const builder =
      this.role_permission_repository.createQueryBuilder('role_permission');
    builder.leftJoin(
      // 'role_permission.permission',
      'admin_permission',
      'permission',
      'role_permission.permission_id = permission.id',
    );
    builder.leftJoin('admin_role', 'role', 'role_permission.role_id = role.id');
    builder.select([
      'role_permission.id as id',
      'role_permission.permission_id as permission_id',
      'role_permission.role_id as role_id',
      'permission.name as permission_name',
      'role.name as role_name',
    ]);
    builder.andWhere({
      role_id,
    });
    const result = await builder.getRawMany();
    return result;
  }
  public async setRoleMenu(role_id: number, body: SetRoleMenuDto) {
    const user = await this.isExistRole(role_id);
    if (user) {
      //删除所有的menu,然后添加
      await this.role_menu_repository.delete({ role_id });
      const data = body.menu_ids.map((item) => ({
        role_id: role_id,
        menu_id: item,
      }));
      const entityData = this.role_menu_repository.create(data);
      const resultData = await this.role_menu_repository.insert(entityData);
      if (!resultData) {
        throw new BadRequestException('插入失败');
      }
      return true;
    }
    return false;
  }
  public async getRoleMenu(role_id: number) {
    const builder = this.role_menu_repository.createQueryBuilder('role_menu');
    builder.leftJoin('admin_menu', 'menu', 'role_menu.menu_id = menu.id');
    builder.select(['menu.*']);
    builder.andWhere({
      role_id,
    });
    const result = await builder.getRawMany();
    return result;
  }
}
