import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IForecast } from '@meteo/models';
import { IAction } from '@lucca-front-sdk/ng/ngrx';
import { SetForecastsData } from './forecast.data';

export interface IForecastState extends EntityState<IForecast> {}
export const forecastAdapter = createEntityAdapter<IForecast>();
const initialState = forecastAdapter.getInitialState();

export function forecastReducer(state: IForecastState = initialState, action: IAction) {
	const forecasts = action.data as IForecast[];
	switch (action.type) {
		case SetForecastsData.TYPE:
			return forecastAdapter.addAll(forecasts, state);
		default:
			return state;
	}
}
