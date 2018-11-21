import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SetForecastsCmd } from './forecast.command';
import { SetForecastsEvt } from './forecast.event';
import { ofType, follow, ARequest, call } from '@lucca-front-sdk/ng/ngrx';
import { of } from 'rxjs';
import { IForecast } from '@meteo/models';

class ForecastsRequest extends ARequest<IForecast[]> {
	static TYPE = '[req] set forecasts';
	call() { return of(this.payload); }
}

@Injectable()
export class ForecastEffect {
	@Effect() handler = this.actions$.pipe(
		ofType(SetForecastsCmd),
		follow(ForecastsRequest),
		call(ForecastsRequest),
		follow(SetForecastsEvt),
	);
	@Effect() complete = this.handler.pipe(
		follow(SetForecastsCmd),
	);

	constructor(
		private actions$: Actions,
	) { }
}
