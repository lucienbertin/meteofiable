import { forecastAdapter, IForecastState } from './forecast.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { dateState } from '../date/index';
import { locationState } from '../location/index';

export { IForecastState } from './forecast.reducer';

const selectors = forecastAdapter.getSelectors();
export const forecastState = createFeatureSelector<IForecastState>('forecasts');
export const selectForecasts = createSelector(
	forecastState,
	selectors.selectAll,
);
const selectForecastsEntities = createSelector(
	forecastState,
	selectors.selectEntities,
);
export const selectCurrentForecast = createSelector(
	selectForecastsEntities,
	dateState,
	locationState,
	(forecastsEntities, date, location) => {
		if (!date || !location) { return undefined; }
		const id = `${location.place_id} - ${date.toISOString()}`;
		return forecastsEntities[id];
	}
);
