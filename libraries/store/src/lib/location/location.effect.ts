import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { IGmapGeocode } from '@meteo/models';
import { GmapService } from '@meteo/core';
import { map } from 'rxjs/operators';

import { SetAdressCmd, SetPlaceIdCmd } from './location.command';
import { SetGeocodeEvt } from './location.event';
import { ARequest, ofType, follow, call, correlated, ofAny } from '@lucca-front-sdk/ng/ngrx';

class AddressToGeocodeRequest extends ARequest<string, IGmapGeocode> {
	static TYPE = '[req] gmap - address to geocode';
	call(gmapService: GmapService) {
		return gmapService.searchAddresses(this.payload).pipe(
			map(geocodes => geocodes[0]),
		);
	}
}
class IdToGeocodeRequest extends ARequest<string, IGmapGeocode> {
	static TYPE = '[req] gmap - place id to geocode';
	call(gmapService: GmapService) {
		return gmapService.getPlace(this.payload);
	}
}
@Injectable()
export class LocationEffect {
	@Effect() addressHandler = this.actions$.pipe(
		ofType(SetAdressCmd),
		follow(AddressToGeocodeRequest),
	);
	@Effect() addressCaller = this.addressHandler.pipe(
		call(this.gmapService),
		follow(SetGeocodeEvt),
	);
	@Effect() addressComplete = this.actions$.pipe(
		correlated(SetAdressCmd),
		ofAny(SetGeocodeEvt),
		follow(SetAdressCmd),
	);
	// ----------------------------------
	@Effect() placeHandler = this.actions$.pipe(
		ofType(SetPlaceIdCmd),
		follow(IdToGeocodeRequest),
	);
	@Effect() placeCaller = this.placeHandler.pipe(
		call(this.gmapService),
		follow(SetGeocodeEvt),
	);
	@Effect() placeComplete = this.actions$.pipe(
		correlated(SetPlaceIdCmd),
		ofAny(SetGeocodeEvt),
		follow(SetPlaceIdCmd),
	);

	constructor(
		private actions$: Actions,
		private gmapService: GmapService,
	) { }
}
