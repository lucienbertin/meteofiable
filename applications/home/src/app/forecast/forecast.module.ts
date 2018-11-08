import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationStoreModule, DateStoreModule } from '@meteo/store';

import {
	ForecastComponent,
	ForecastDetailComponent,
	TimelineComponent,
	TimelineForecastComponent,
} from './components';
import { ForecastMetaModule } from './components/meta/forecast-meta.module';


@NgModule({
	declarations: [
		ForecastComponent,
		ForecastDetailComponent,
		TimelineComponent,
		TimelineForecastComponent,
	],
	exports: [
		ForecastComponent,
		ForecastDetailComponent,
		TimelineComponent,
		TimelineForecastComponent,
	],
	imports: [
		CommonModule,
		LocationStoreModule,
		DateStoreModule,
		ForecastMetaModule,
	],
})
export class ForecastModule { }
