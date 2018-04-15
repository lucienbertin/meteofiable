import {AAction} from './action.model';
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
	call<R extends ARequest = ARequest>(r: R): MfActions<R> {
		return call(r)(this.of(r) as MfActions<R>) as MfActions<R>;
		// return this.actions$.ofType<R>(req.type)
		// .switchMap(r => {
		// 	return r.callFn()
		// 	.map(result => r.onSuccess(result))
		// 	.catch(error => Observable.of(r.onError(error)));
		// });
	}
}
function of<A extends AAction = AAction>(action: A) {
	return filter((a: AAction): a is A => a.type === action.type);
}
function call<R extends ARequest = ARequest>(request: R) {
	return switchMap(
		(r: R) => catchError(e => r.onError(e))(map(result => r.onSuccess(result))(r.callFn()))
	);
}
