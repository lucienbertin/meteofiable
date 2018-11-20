import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MfActions, ADataAction } from '@meteo/core';
import { AAction, ofSuccess, follow } from '@lucca-front-sdk/ng/ngrx';

import { SetGeocodeEvt } from './location.event';
import { IGmapGeocode } from '@meteo/models';

export class SetGeocodeData extends AAction<IGmapGeocode> {
	static TYPE = '[data] set geocode';
	// constructor(geocode?: IGmapGeocode) {
	// 	super(
	// 		'[data] set geocode',
	// 		geocode,
	// 	);
	// }
}

@Injectable()
export class LocationDataEffect {
	// @Effect() setGeocode = this.actions$.of(new SetGeocodeEvt())
	// 	.follow(e => new SetGeocodeData(e.data));
	@Effect() setGeocode = this.actions$.pipe(
		ofSuccess(SetGeocodeEvt),
		follow(SetGeocodeData),
	);
	constructor(
		private actions$: Actions,
	) { }
}
