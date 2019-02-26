import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AAction, ofSuccess, follow, IAction } from '@lucca-front-sdk/ng/ngrx';

import { SetGeocodeEvt } from './location.event';
import { IGmapGeocode } from '@meteo/models';

export class SetGeocodeData extends AAction<IGmapGeocode> {
	static TYPE = '[data] set geocode';
}

@Injectable()
export class LocationDataEffect {
	@Effect() setGeocode = this.actions$.pipe(
		ofSuccess(SetGeocodeEvt),
		follow(SetGeocodeData),
	);
	constructor(
		private actions$: Actions<IAction>,
	) { }
}
