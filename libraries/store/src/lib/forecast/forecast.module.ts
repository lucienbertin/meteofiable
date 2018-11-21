import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ForecastEffect } from './forecast.effect';
import { ForecastTrigger } from './forecast.trigger';
import { ForecastFactory } from './forecast.factory';
import { DateStoreModule } from '../date/index';
import { LocationStoreModule } from '../location/index';
// import { DateDataEffect } from './forecast.data';
// import { dateReducer } from './forecast.reducer';

@NgModule({
	imports: [
		// StoreModule.forFeature('date', dateReducer),
		EffectsModule.forFeature([ForecastEffect]),
		EffectsModule.forFeature([ForecastTrigger]),
		DateStoreModule,
		LocationStoreModule,
	],
	providers: [
		ForecastFactory,
	],
})
export class ForecastStoreModule { }
