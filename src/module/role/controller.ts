import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WrapController } from 'nestjs-abstract-module';
import { AdminRoleEntity } from './entity';
import { AdminRoleService } from './service';
import { SetRoleMenuDto, SetRolePermissionDto } from './dto';
import { AuthPermissionGuard } from '../decorators';
import { PublicGuard } from '../decorators/piblic_guard';
import { myEmitterInstalled } from '../global.var';
const CrudController = WrapController({
  model: AdminRoleEntity,
});
@AuthPermissionGuard()
@Controller('admin/role')
export class AdminRoleController extends CrudController {
  constructor(readonly service: AdminRoleService) {
    super(service);
  }
  //设置角色权限
  @Post(':role_id/permission')
  async setRolePermission(
    @Param('role_id') role_id: number,
    @Body() body: SetRolePermissionDto,
  ) {
    return await this.service.setRolePermission(role_id, body);
  }
  //获取角色权限
  @Get(':role_id/permission')
  async getRolePermission(@Param('role_id') role_id: number) {
    return await this.service.getRolePermission(role_id);
  }
  //设置角色菜单
  @Post(':role_id/menu')
  async setRoleMenu(
    @Param('role_id') role_id: number,
    @Body() body: SetRoleMenuDto,
  ) {
    return await this.service.setRoleMenu(role_id, body);
  }
  //获取角色菜单权限
  @Get(':role_id/menu')
  async getRoleMenu(@Param('role_id') role_id: number) {
    return await this.service.getRoleMenu(role_id);
  }
}
