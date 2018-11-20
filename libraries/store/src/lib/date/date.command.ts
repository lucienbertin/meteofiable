import {ACommand} from '@lucca-front-sdk/ng/ngrx';
import { Moment } from 'moment';
export class SetDateCmd extends ACommand<Moment> {
	static TYPE = '[cmd] set date';
}
