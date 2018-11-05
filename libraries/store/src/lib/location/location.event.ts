import { AEvent } from '@meteo/core';
import { IGmapGeocode } from '@meteo/models';

export class SetGeocodeEvt extends AEvent<IGmapGeocode> {
	constructor(geocode?: IGmapGeocode) {
		super(
			'[evt] set geocode',
			geocode,
		);
	}
}
