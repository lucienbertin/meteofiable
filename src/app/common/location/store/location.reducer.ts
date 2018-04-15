import { IGmapGeocode } from 'app/models';
import { AAction } from 'app/core';

import { SetGeocodeData } from './location.data';

const setGeocodeType = new SetGeocodeData().type;
export function locationReducer(geocode: IGmapGeocode, action: AAction) {
	switch (action.type) {
		case setGeocodeType:
			const setGeocodeData = action as SetGeocodeData;
			return setGeocodeData.data;
		default:
			return geocode;
	}
}

// import { IAction } from 'app/common/store/deprecated';
// import { UpdateFilterDataAction, EnrFilterDataAction } from './filter.data';
// import { IFilter, Filter } from '../filter.model';

// const updateFilterDataAction = new UpdateFilterDataAction().type;
// const enrFilterDataAction = new EnrFilterDataAction().type;
// export function filterReducer(filters: IFilter = new Filter(), action: IAction) {
// 	switch (action.type) {
// 		case updateFilterDataAction:
// 			return action.payload.data;
// 		case enrFilterDataAction:
// 			return action.payload.data;
// 		default:
// 			return filters;
// 	}
// }