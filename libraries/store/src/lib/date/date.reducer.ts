
import { SetDateData } from './date.data';
import { Moment } from 'moment';
import { IAction, ActionStatus, transformType } from '@lucca-front-sdk/ng/ngrx';

const setDateType = transformType(SetDateData.TYPE, ActionStatus.success);
export function dateReducer(date: Moment, action: IAction) {
	switch (action.type) {
		case setDateType:
			const setDateData = action as SetDateData;
			return setDateData.data;
		default:
			return date;
	}
}
