// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, DoNothingCommand, ARequest, AAction } from 'app/core';

import { SetAdressCmd } from './location.command';
import { SetGeocodeEvt } from './location.event';
import { GmapService } from 'app/common/gmap';
import { IGmapGeocode } from 'app/models';

class AddressToGeocodeRequest extends ARequest<IGmapGeocode> {
	constructor() {
		super('[req] gmap - address to geocode');
	}
}
class DebugAction extends AAction<number> {
	constructor(a: AAction) {
		super(
			`[debug] '${a.type}' correlated to command of id: ${a.commandId}`,
		);
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

	constructor(
		private actions$: MfActions,
		private gmapService: GmapService,
	) { }
}
