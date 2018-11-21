import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IForecast } from '@meteo/models';

export interface IForecastStateState extends EntityState<IForecast> {}

const forecastAdapter = createEntityAdapter<IForecast>();
