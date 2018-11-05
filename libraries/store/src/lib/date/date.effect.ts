import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions } from '@meteo/core';

import { SetDateCmd } from './date.command';
import { SetDateEvt } from './date.event';

@Injectable()
export class DateEffect {
	@Effect() setDateHandler = this.actions$
		.of(new SetDateCmd())
		.follow(c => new SetDateEvt(c.payload.date));
	@Effect() setAddressComplete = this.actions$
		.complete(new SetDateCmd(), new SetDateEvt());

	constructor(
		private actions$: MfActions,
	) { }
}
