import {AAction, ASuccessableAction, followUp} from './action.model';
import {ARequest} from './request.model';
import {Injectable, Inject} from '@angular/core';
import {ScannedActionsSubject} from '@ngrx/store';
import {Actions as NgrxActions} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators/filter';
import {switchMap} from 'rxjs/operators/switchMap';
import {map} from 'rxjs/operators/map';
import {catchError} from 'rxjs/operators/catchError';

@Injectable()
export class MfActions<A extends AAction = AAction> extends NgrxActions<A> {
	constructor(@Inject(ScannedActionsSubject) source?: Observable<A>) {
		super(source);
	}
	of<B extends AAction = AAction>(b: B): MfActions<B> {
		return of(b)(this as MfActions<A>) as MfActions<B>;
	}
	success<B extends ASuccessableAction = ASuccessableAction>(b: B): MfActions<B> {
		return success(b)(this as MfActions<A>) as MfActions<B>;
	}
	error<B extends ASuccessableAction = ASuccessableAction>(b: B): MfActions<B> {
		return error(b)(this as MfActions<A>) as MfActions<B>;
	}
	call<R extends ARequest = ARequest>(r: R): MfActions<R> {
		return call(r)(this.of(r) as MfActions<R>) as MfActions<R>;
	}
}
function of<A extends AAction = AAction>(action: A) {
	return filter((a: AAction): a is A => a.type === action.type);
}
function success<A extends ASuccessableAction = ASuccessableAction>(action: A) {
	return filter((a: AAction): a is A => a.type === followUp(action.type, true));
}
function error<A extends ASuccessableAction = ASuccessableAction>(action: A) {
	return filter((a: AAction): a is A => a.type === followUp(action.type, false));
}
function call<R extends ARequest = ARequest>(request: R) {
	return switchMap(
		(r: R) => catchError(e => r.onError(e))(map(result => r.onSuccess(result))(r.callFn()))
	);
}

