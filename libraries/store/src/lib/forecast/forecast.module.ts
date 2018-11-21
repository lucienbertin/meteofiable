import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ForecastEffect } from './forecast.effect';
import { ForecastTrigger } from './forecast.trigger';
import { ForecastFactory } from './forecast.factory';
import { DateStoreModule } from '../date/index';
import { LocationStoreModule } from '../location/index';
import { forecastReducer } from './forecast.reducer';
import { ForecastDataEffect } from './forecast.data';

@NgModule({
	imports: [
		StoreModule.forFeature('forecasts', forecastReducer),
		EffectsModule.forFeature([ForecastEffect]),
		EffectsModule.forFeature([ForecastTrigger]),
		EffectsModule.forFeature([ForecastDataEffect]),
		DateStoreModule,
		LocationStoreModule,
	],
	providers: [
		ForecastFactory,
	],
})
export class ForecastStoreModule { }
