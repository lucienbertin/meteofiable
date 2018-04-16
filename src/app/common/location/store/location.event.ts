import { AEvent } from 'app/core';
import { IGmapGeocode } from 'app/models';

export class SetGeocodeEvt extends AEvent<IGmapGeocode> {
	constructor(geocode?: IGmapGeocode) {
		super(
			'[evt] set geocode',
			geocode,
		);
	}
}
