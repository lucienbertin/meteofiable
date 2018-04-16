import { IGmapGeocode } from 'app/models';
import { AAction } from 'app/core';

import { SetDateData } from './date.data';
import { Moment } from 'moment';

const setDateType = new SetDateData().type;
export function dateReducer(date: Moment, action: AAction) {
	switch (action.type) {
		case setDateType:
			const setDateData = action as SetDateData;
			return setDateData.data;
		default:
			return date;
	}
}
