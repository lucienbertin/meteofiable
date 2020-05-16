import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SetForecastsCmd } from './forecast.command';
import { SetForecastsEvt } from './forecast.event';
import { ofPending, complete, callAndFollow, IAction } from '@lucca-front-sdk/ng/ngrx';
import { of } from 'rxjs';
import { IForecast } from '@meteo/models';

@Injectable()
export class ForecastEffect {
	@Effect() handler = this.actions$.pipe(
		ofPending(SetForecastsCmd),
		callAndFollow(p => of(p), SetForecastsEvt),
	);
	@Effect() complete = this.handler.pipe(
		complete(SetForecastsCmd),
	);

	constructor(
		private actions$: Actions<IAction>,
	) { }
}
