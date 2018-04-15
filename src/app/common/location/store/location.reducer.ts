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
