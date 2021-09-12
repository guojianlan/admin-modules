import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';

export class LoginByEmailDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterByEmailDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class LoginByUserNameDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  code: string;
}
export class RegisterByUserNameDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  code: string;
}
export class SetUserRoleDto {
  @IsArray()
  role_ids: number[];
}
