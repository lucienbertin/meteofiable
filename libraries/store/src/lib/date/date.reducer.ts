
import { SetDateData } from './date.data';
import { Moment } from 'moment';
import { IAction } from '@lucca-front-sdk/ng/ngrx';

const setDateType = SetDateData.TYPE;
export function dateReducer(date: Moment, action: IAction) {
	switch (action.type) {
		case setDateType:
			const setDateData = action as SetDateData;
			return setDateData.data;
		default:
			return date;
	}
}
