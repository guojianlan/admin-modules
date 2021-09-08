import { Controller, Get } from '@nestjs/common';

import { WrapController, HocClass, Constructor } from 'nestjs-abstract-module';
import { UserService } from './service';
import { UserEntity } from './entity'

// export class ExtendCl {
//    service: UserService
//     @Get('ttt')
//     test() {
//         return this.service.test()
//     }
// }
// export const CrudController = HocClass(
//     
//     ExtendCl,
// );
const CrudController = WrapController<UserEntity>({
    model: UserEntity,
})
export class AdminUserController extends CrudController {
    constructor(readonly service: UserService) {
        super(service);
    }
    @Get('ttt')
    test() {
        return this.service.test();
    }
}
