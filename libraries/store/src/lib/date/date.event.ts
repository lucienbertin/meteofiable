import { AEvent } from '@meteo/core';
import { Moment } from 'moment';

export class SetDateEvt extends AEvent<Moment> {
	constructor(date?: Moment) {
		super(
			'[evt] set date',
			date,
		);
	}
}
