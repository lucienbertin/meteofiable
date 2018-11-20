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
	call([gmapService]) {
		return gmapService.searchAddresses(this.payload).pipe(
			map(geocodes => geocodes[0]),
		);
	}
	// constructor() {
	// 	super('[req] gmap - address to geocode');
	// }
}
class IdToGeocodeRequest extends ARequest<string, IGmapGeocode> {
	static TYPE = '[req] gmap - place id to geocode';
	call([gmapService]) {
		return gmapService.getPlace(this.payload);
	}
	// constructor() {
	// 	super('[req] gmap - place id to geocode');
	// }
}
@Injectable()
export class LocationEffect {
	@Effect() addressHandler = this.actions$.pipe(
		ofType(SetAdressCmd),
		follow(AddressToGeocodeRequest),
	);
	@Effect() addressCaller = this.actions$.pipe(
		call(AddressToGeocodeRequest, this.gmapService),
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
	@Effect() placeCaller = this.actions$.pipe(
		call(IdToGeocodeRequest, this.gmapService),
		follow(SetGeocodeEvt),
	);
	@Effect() placeComplete = this.actions$.pipe(
		correlated(SetPlaceIdCmd),
		ofAny(SetGeocodeEvt),
		follow(SetPlaceIdCmd),
	);
	// @Effect() setAddressHandler = this.actions$
	// 	.of(new SetAdressCmd())
	// 	.follow(c =>
	// 		new AddressToGeocodeRequest()
	// 		.setCall(() => this.gmapService.searchAddresses(c.payload.address).pipe(map(geocodes => geocodes[0])))
	// 	);
	// @Effect() callAddressApi = this.actions$
	// 	.call(new AddressToGeocodeRequest());
	// @Effect() gotGeocodeFromAddress = this.actions$
	// 	.success(new AddressToGeocodeRequest())
	// 	.follow(r => new SetGeocodeEvt(r.data));
	// @Effect() setAddressComplete = this.actions$
	// 	.complete(new SetAdressCmd(), new SetGeocodeEvt());

	// // ----------------------------------
	// @Effect() setPlaceHandler = this.actions$
	// 	.of(new SetPlaceIdCmd())
	// 	.follow(c =>
	// 		new IdToGeocodeRequest()
	// 		.setCall(() => this.gmapService.getPlace(c.payload.placeId))
	// 	);
	// @Effect() callPlaceApi = this.actions$
	// 	.call(new IdToGeocodeRequest());
	// @Effect() gotPlaceFromId = this.actions$
	// 	.success(new IdToGeocodeRequest())
	// 	.follow(r => new SetGeocodeEvt(r.data));
	// @Effect() setPlaceComplete = this.actions$
	// 	.complete(new SetPlaceIdCmd(), new SetGeocodeEvt());

	constructor(
		private actions$: Actions,
		private gmapService: GmapService,
	) { }
}
