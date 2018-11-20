import { AEvent } from '@lucca-front-sdk/ng/ngrx';
import { IGmapGeocode } from '@meteo/models';

export class SetGeocodeEvt extends AEvent<string, IGmapGeocode> {
	static TYPE = '[evt] set geocode';
	// constructor(geocode?: IGmapGeocode) {
	// 	super(
	// 		'[evt] set geocode',
	// 		geocode,
	// 	);
	// }
}
