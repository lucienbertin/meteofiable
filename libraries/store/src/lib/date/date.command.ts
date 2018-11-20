// import { ACommand } from '@meteo/core';
import {ACommand} from '@lucca-front-sdk/ng/ngrx';
import { Moment } from 'moment';
// export class SetDateCmd extends ACommand<Moment> {
// 	constructor(date?: Moment) {
// 		super(
// 			'[cmd] set date',
// 			undefined,
// 			{ date: date },
// 		);
// 	}
// }
export class SetDateCmd extends ACommand<Moment> {
	static TYPE = '[cmd] set date';
}
