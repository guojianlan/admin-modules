import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
import { IsEmail, IsNotEmpty } from 'class-validator';

const saltOrRounds = 10;
export const hash = (password) => {
  console.log(password);
  return bcrypt.hashSync(password, saltOrRounds);
};
export const isMatchPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
export class TransformerPassword implements ValueTransformer {
  from(val) {
    return val;
  }
  to(val) {
    return hash(val);
  }
}
@Entity('admin_user')
export class AdminUserEntity extends AbstractTypeEntity {
  @Column()
  mobile: string;
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;
  @IsNotEmpty()
  @Column({
    default: '',
    transformer: new TransformerPassword(),
  })
  password: string;
}
