import { AEvent } from '@lucca-front-sdk/ng/ngrx';
import { IForecast } from '@meteo/models';
export class SetForecastsEvt extends AEvent<IForecast[]> {
	static TYPE = '[evt] set forecasts';
}
