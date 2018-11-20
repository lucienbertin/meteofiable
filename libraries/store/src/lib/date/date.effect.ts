import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
// import { MfActions } from '@meteo/core';

import { SetDateCmd } from './date.command';
import { SetDateEvt } from './date.event';
import { ofType, follow, ofAny, correlated } from '@lucca-front-sdk/ng/ngrx';

@Injectable()
export class DateEffect {
	// @Effect() setDateHandler = this.actions$
	// 	.of(new SetDateCmd())
	// 	.follow(c => new SetDateEvt(c.payload.date));
	// @Effect() setAddressComplete = this.actions$
	// 	.complete(new SetDateCmd(), new SetDateEvt());
	@Effect() handler = this.actions$.pipe(
		ofType(SetDateCmd),
		follow(SetDateEvt),
	);
	// @Effect() complete = this.actions$.pipe(
	// 	correlated(SetDateCmd),
	// 	ofAny(SetDateEvt),
	// 	follow(SetDateCmd),
	// );
	@Effect() complete = this.handler.pipe(
		follow(SetDateCmd),
	);

	constructor(
		private actions$: Actions,
	) { }
}
