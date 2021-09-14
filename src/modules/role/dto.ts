import { IsArray } from 'class-validator';

export class SetRolePermissionDto {
  @IsArray()
  permission_ids: number[];
}

export class SetRoleMenuDto {
  @IsArray()
  menu_ids: number[];
}
