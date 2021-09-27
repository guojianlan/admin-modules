import { AbstractTypeEntity } from '@guojian/nestjs-abstract-module';
import { Column, Entity } from 'typeorm';

@Entity('image')
export class ImageEntity extends AbstractTypeEntity {
  @Column({
    length: 1000,
  })
  object_name: string;

  @Column({
    length: 255,
  })
  md5: string;
}
