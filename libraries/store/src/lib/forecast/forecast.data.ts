import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AAction, ofSuccess, follow, IAction } from '@lucca-front-sdk/ng/ngrx';
import { IForecast } from '@meteo/models';
import { SetForecastsEvt } from './forecast.event';

export class SetForecastsData extends AAction<IForecast[]> {
	static TYPE = '[data] set forecasts';
}
@Injectable()
export class ForecastDataEffect {
	@Effect() set = this.actions$.pipe(
		ofSuccess(SetForecastsEvt),
		follow(SetForecastsData),
	);
	constructor(
		private actions$: Actions<IAction>,
	) { }
}
