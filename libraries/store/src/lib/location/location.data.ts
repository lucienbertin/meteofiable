import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, ADataAction } from '@meteo/core';

import { SetGeocodeEvt } from './location.event';
import { IGmapGeocode } from '@meteo/models';

export class SetGeocodeData extends ADataAction<IGmapGeocode> {
	constructor(geocode?: IGmapGeocode) {
		super(
			'[data] set geocode',
			geocode,
		);
	}
}

@Injectable()
export class LocationDataEffect {
	@Effect() setGeocode = this.actions$.of(new SetGeocodeEvt())
		.follow(e => new SetGeocodeData(e.data));
	constructor(
		private actions$: MfActions,
	) { }
}
