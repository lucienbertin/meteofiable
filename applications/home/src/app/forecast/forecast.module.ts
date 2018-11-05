import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationStoreModule, DateStoreModule } from '@meteo/store';

import {
	ForecastComponent,
	ForecastDetailComponent,
	TimelineComponent,
	TimelineForecastComponent,
} from './components';


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
	],
})
export class ForecastModule { }
