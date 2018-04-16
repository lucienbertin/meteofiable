import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, ARequest } from 'app/core';

import { SetAdressCmd, SetPlaceIdCmd } from './location.command';
import { SetGeocodeEvt } from './location.event';
import { GmapService } from 'app/common/gmap';
import { IGmapGeocode } from 'app/models';

class AddressToGeocodeRequest extends ARequest<IGmapGeocode> {
	constructor() {
		super('[req] gmap - address to geocode');
	}
}
class IdToGeocodeRequest extends ARequest<IGmapGeocode> {
	constructor() {
		super('[req] gmap - place id to geocode');
	}
}
@Injectable()
export class LocationEffect {
	@Effect() setAddressHandler = this.actions$
		.of(new SetAdressCmd())
		.follow(c =>
			new AddressToGeocodeRequest()
			.setCall(() => this.gmapService.searchAddresses(c.payload.address).map(geocodes => geocodes[0]))
		);
	@Effect() callAddressApi = this.actions$
		.call(new AddressToGeocodeRequest());
	@Effect() gotGeocodeFromAddress = this.actions$
		.success(new AddressToGeocodeRequest())
		.follow(r => new SetGeocodeEvt(r.data));
	@Effect() setAddressComplete = this.actions$
		.complete(new SetAdressCmd(), new SetGeocodeEvt());

	// ----------------------------------
	@Effect() setPlaceHandler = this.actions$
		.of(new SetPlaceIdCmd())
		.follow(c =>
			new IdToGeocodeRequest()
			.setCall(() => this.gmapService.getPlace(c.payload.placeId))
		);
	@Effect() callPlaceApi = this.actions$
		.call(new IdToGeocodeRequest());
	@Effect() gotPlaceFromId = this.actions$
		.success(new IdToGeocodeRequest())
		.follow(r => new SetGeocodeEvt(r.data));
	@Effect() setPlaceComplete = this.actions$
		.complete(new SetPlaceIdCmd(), new SetGeocodeEvt());

	constructor(
		private actions$: MfActions,
		private gmapService: GmapService,
	) { }
}
