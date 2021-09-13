import { IsArray } from "class-validator";

export class SetRolePermissionDto {
  @IsArray()
  permission_ids: number[];
}
