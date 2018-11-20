import { IGmapGeocode } from '@meteo/models';

import { SetGeocodeData } from './location.data';
import { IAction } from '@lucca-front-sdk/ng/ngrx';

const setGeocodeType = SetGeocodeData.TYPE;
export function locationReducer(geocode: IGmapGeocode, action: IAction) {
	switch (action.type) {
		case setGeocodeType:
			const setGeocodeData = action as SetGeocodeData;
			return setGeocodeData.data;
		default:
			return geocode;
	}
}
