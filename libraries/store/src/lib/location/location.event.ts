import { AEvent } from '@lucca-front-sdk/ng/ngrx';
import { IGmapGeocode } from '@meteo/models';

export class SetGeocodeEvt extends AEvent<IGmapGeocode> {
	static TYPE = '[evt] set geocode';
}
