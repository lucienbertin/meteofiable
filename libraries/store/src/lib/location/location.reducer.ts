import { IGmapGeocode } from '@meteo/models';
import { AAction } from '@meteo/core';

import { SetGeocodeData } from './location.data';

const setGeocodeType = SetGeocodeData.TYPE;
export function locationReducer(geocode: IGmapGeocode, action: AAction) {
	switch (action.type) {
		case setGeocodeType:
			const setGeocodeData = action as SetGeocodeData;
			return setGeocodeData.data;
		default:
			return geocode;
	}
}
