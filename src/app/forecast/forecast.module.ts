import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationStoreModule, DateStoreModule } from 'app/common';

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
	providers: [
	],
})
export class ForecastModule { }
