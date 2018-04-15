import {AAction} from './action.model';
import {Injectable, Inject} from '@angular/core';
import {ScannedActionsSubject} from '@ngrx/store';
import {Actions as NgrxActions} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {filter} from 'rxjs/operators/filter';

@Injectable()
export class MfActions<A extends AAction = AAction> extends NgrxActions<A> {
	constructor(@Inject(ScannedActionsSubject) source?: Observable<A>) {
		super(source);
	}
	of<B extends AAction = AAction>(b: B): MfActions<B> {
		return of(b)(this as MfActions<A>) as MfActions<B>;
	}
}
export function of<A extends AAction = AAction>(action: A) {
	return filter((a: AAction): a is A => a.type === action.type);
}
