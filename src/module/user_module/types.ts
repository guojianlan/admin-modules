import { UserController } from './user/controller';
import { UserService } from './user';

export interface Param {
  controllers: any[];
  providers: any[];
  imports: any[];
  inject: any[];
  destination?: string;
  useFactory: (...args: [UserController, UserService, ...any[]]) => void;
}
