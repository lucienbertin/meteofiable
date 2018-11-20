import { Moment } from 'moment';
import {AEvent} from '@lucca-front-sdk/ng/ngrx';

export class SetDateEvt extends AEvent<Moment> {
	static TYPE = '[evt] set date';
}
