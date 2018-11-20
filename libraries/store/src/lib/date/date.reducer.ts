import { AAction } from '@meteo/core';

import { SetDateData } from './date.data';
import { Moment } from 'moment';

const setDateType = SetDateData.TYPE;
export function dateReducer(date: Moment, action: AAction) {
	switch (action.type) {
		case setDateType:
			const setDateData = action as SetDateData;
			return setDateData.data;
		default:
			return date;
	}
}
