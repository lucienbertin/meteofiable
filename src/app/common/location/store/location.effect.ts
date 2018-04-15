// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { MfActions, DoNothingCommand } from 'app/core';

import { SetAdressCmd } from './location.command';


@Injectable()
export class LocationEffect {
	@Effect() setAddressHandler = this.actions$.of(new SetAdressCmd())
	.map(c => new DoNothingCommand());

	constructor(
		private actions$: MfActions,
	) { }
}
