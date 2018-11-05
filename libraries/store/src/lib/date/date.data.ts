import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, ADataAction } from '@meteo/core';

import { SetDateEvt } from './date.event';
import { Moment } from 'moment';

export class SetDateData extends ADataAction<Moment> {
	constructor(date?: Moment) {
		super(
			'[data] set date',
			date,
		);
	}
}

@Injectable()
export class DateDataEffect {
	@Effect() setGeocode = this.actions$.of(new SetDateEvt())
		.follow(e => new SetDateData(e.data));
	constructor(
		private actions$: MfActions,
	) { }
}
