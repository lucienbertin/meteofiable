import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationStoreModule, DateStoreModule } from 'app/common';

import {
	ForecastComponent,
	ForecastDetailComponent,
	TimelineComponent,
} from './components';


@NgModule({
	declarations: [
		ForecastComponent,
		ForecastDetailComponent,
		TimelineComponent,
	],
	exports: [
		ForecastComponent,
		ForecastDetailComponent,
		TimelineComponent,
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
