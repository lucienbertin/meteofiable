import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SetDateCmd } from './date.command';
import { SetDateEvt } from './date.event';
import { ofPending, callAndFollow, complete } from '@lucca-front-sdk/ng/ngrx';
import { of } from 'rxjs';

@Injectable()
export class DateEffect {
	@Effect() handler = this.actions$.pipe(
		ofPending(SetDateCmd),
		callAndFollow(p => of(p), SetDateEvt),
	);
	@Effect() complete = this.handler.pipe(
		complete(SetDateCmd),
	);

	constructor(
		private actions$: Actions,
	) { }
}
