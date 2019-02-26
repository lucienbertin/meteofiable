import {ACommand} from '@lucca-front-sdk/ng/ngrx';
import { IForecast } from '@meteo/models';
export class SetForecastsCmd extends ACommand<IForecast[]> {
	static TYPE = '[cmd] set forecasts';
}
