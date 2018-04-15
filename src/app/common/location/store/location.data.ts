// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, DoNothingCommand, ADataAction } from 'app/core';

import { SetGeocodeEvt } from './location.event';
import { IGmapGeocode } from 'app/models';

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
	.map(e => new SetGeocodeData(e.data).follow(e));
	constructor(
		private actions$: MfActions,
	) { }
}
