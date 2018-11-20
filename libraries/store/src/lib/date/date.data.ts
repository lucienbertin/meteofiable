import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SetDateEvt } from './date.event';
import { Moment } from 'moment';
import { AAction, ofSuccess, follow } from '@lucca-front-sdk/ng/ngrx';

export class SetDateData extends AAction<Moment> {
	static TYPE = '[data] set date';
}
@Injectable()
export class DateDataEffect {
	@Effect() setDate = this.actions$.pipe(
		ofSuccess(SetDateEvt),
		follow(SetDateData),
	);
	constructor(
		private actions$: Actions,
	) { }
}
