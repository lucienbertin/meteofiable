import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SetDateCmd } from './date.command';
import { SetDateEvt } from './date.event';
import { ofType, follow, ofAny, correlated, ARequest, call } from '@lucca-front-sdk/ng/ngrx';
import { Moment } from 'moment';
import { of } from 'rxjs';

class DateRequest extends ARequest<Moment> {
	static TYPE = '[req] set date';
	call() { return of(this.payload); }
}

@Injectable()
export class DateEffect {
	@Effect() handler = this.actions$.pipe(
		ofType(SetDateCmd),
		follow(DateRequest),
		call(DateRequest),
		follow(SetDateEvt),
	);
	@Effect() complete = this.handler.pipe(
		follow(SetDateCmd),
	);

	constructor(
		private actions$: Actions,
	) { }
}
