import { ACommand } from '@meteo/core';
import { Moment } from 'moment';
export class SetDateCmd extends ACommand<Moment> {
	constructor(date?: Moment) {
		super(
			'[cmd] set date',
			undefined,
			{ date: date },
		);
	}
}
