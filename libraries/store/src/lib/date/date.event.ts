// import { AEvent } from '@meteo/core';
import { Moment } from 'moment';
import {AEvent} from '@lucca-front-sdk/ng/ngrx';

export class SetDateEvt extends AEvent<Moment> {
	static TYPE = '[evt] set date';
// 	constructor(date?: Moment) {
// 		super(
// 			'[evt] set date',
// 			date,
// 		);
// 	}
}
