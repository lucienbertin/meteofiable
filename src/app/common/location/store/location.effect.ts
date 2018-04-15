// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, DoNothingCommand, ARequest } from 'app/core';

import { SetAdressCmd } from './location.command';
import { GmapService } from 'app/common/gmap';
import { IGmapGeocode } from 'app/models';

class AddressToGeocodeRequest extends ARequest<IGmapGeocode> {
	constructor() {
		super('[req] gmap - address to geocode');
	}
}

@Injectable()
export class LocationEffect {
	@Effect() setAddressHandler = this.actions$.of(new SetAdressCmd())
	.map(c =>
		new AddressToGeocodeRequest()
		.follow(c)
		.setCall(() => this.gmapService.searchAddresses(c.payload.address).map(geocodes => geocodes[0]))
	);
	@Effect() callAddressApi = this.actions$.call(new AddressToGeocodeRequest());

	constructor(
		private actions$: MfActions,
		private gmapService: GmapService,
	) { }
}
