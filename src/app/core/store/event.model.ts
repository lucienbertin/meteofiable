import { ASuccessableAction } from './action.model';
export abstract class AEvent<T = any> extends ASuccessableAction<T> {
}
