import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { IGmapGeocode } from '@meteo/models';
import { GmapService } from '@meteo/core';
import { map } from 'rxjs/operators';

import { SetAdressCmd, SetPlaceIdCmd } from './location.command';
import { SetGeocodeEvt } from './location.event';
import { ofComplete, ofPending, callAndFollow, correlated, complete } from '@lucca-front-sdk/ng/ngrx';

@Injectable()
export class LocationEffect {
	@Effect() addressHandler = this.actions$.pipe(
		ofPending(SetAdressCmd),
		callAndFollow(p => this.gmapService.searchAddresses(p).pipe(map(geocodes => geocodes[0])), SetGeocodeEvt),
	);
	@Effect() addressComplete = this.actions$.pipe(
		correlated(SetAdressCmd),
		ofComplete(SetGeocodeEvt),
		complete(SetAdressCmd),
	);
	// ----------------------------------
	@Effect() placeHandler = this.actions$.pipe(
		ofPending(SetPlaceIdCmd),
		callAndFollow(p => this.gmapService.getPlace(p), SetGeocodeEvt)
	);
	@Effect() placeComplete = this.actions$.pipe(
		correlated(SetPlaceIdCmd),
		ofComplete(SetGeocodeEvt),
		complete(SetPlaceIdCmd),
	);

	constructor(
		private actions$: Actions,
		private gmapService: GmapService,
	) { }
}
