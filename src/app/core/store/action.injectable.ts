import {AAction, ASuccessableAction, followUp} from './action.model';
import {ACommand} from './command.model';
import {AEvent} from './event.model';
import {ARequest} from './request.model';
import {Injectable, Inject} from '@angular/core';
import {ScannedActionsSubject} from '@ngrx/store';
import {Actions as NgrxActions} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators/filter';
import {switchMap} from 'rxjs/operators/switchMap';
import {map} from 'rxjs/operators/map';
import {mergeMap} from 'rxjs/operators/mergeMap';
import {catchError} from 'rxjs/operators/catchError';
import { UnaryFunction } from 'rxjs/interfaces';
import { Operator } from 'rxjs/Operator';

@Injectable()
export class MfActions<A extends AAction = AAction> extends NgrxActions<A> {
	constructor(@Inject(ScannedActionsSubject) source?: Observable<A>) {
		super(source);
	}

	lift<R>(operator: Operator<A, R>): Observable<R> {
		const observable = <any>(new MfActions(this));
		observable.operator = operator;
		return observable;
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
	correlated<B extends AAction = AAction>(b: B): MfActions<A> {
		return correlated(b)(this) as MfActions<A>;
	}
	complete<C extends ACommand = ACommand, E extends AEvent = AEvent>(c: C, e: E): MfActions<C> {
		return complete(c, e)(this) as MfActions<C>;
	}
	follow<B extends AAction = AAction>(bFactory: (a: A) => B) {
		return follow(bFactory)(this);
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
function correlated<A extends AAction = AAction>(action: A): UnaryFunction<MfActions, MfActions> {
	return function(source: MfActions): MfActions {
		const ofSource = of(action)(source) as MfActions<A>;
		const correlatedActions = mergeMap((a: A) => filter((b: AAction) => b.correlationId === a.correlationId)(source))(ofSource) as MfActions;
		return correlatedActions;
	};
}
function complete<C extends ACommand = ACommand, E extends AEvent = AEvent>(c: C, e: E): UnaryFunction<MfActions, MfActions> {
	return function(source: MfActions<AAction>): MfActions<AAction> {
		const correlatedSource = correlated(c)(source);
		const correlatedEventSource = of(e)(correlatedSource) as MfActions<E>;
		return map((evt: E) => c.follow(evt).onSuccess(evt.data))(correlatedEventSource) as MfActions;
	};
}
function follow<A extends AAction = AAction, B extends AAction = AAction>(bFactory: (a: A) => B) {
	return map((action: A) => bFactory(action).follow(action));
}
