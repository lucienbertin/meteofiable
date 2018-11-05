import { ASuccessableAction } from './action.model';
import { Observable } from 'rxjs';
export abstract class ARequest<T = any> extends ASuccessableAction<T> {
	callFn: () => Observable<T>;
	setCall(fn: () => Observable<T>) {
		this.callFn = fn;
		return this;
	}
}
