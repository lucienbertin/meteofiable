import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastStoreModule } from '@meteo/store';
import { ConductorModule } from '@lucca-front-sdk/ng/ngrx';

import {
	ForecastComponent,
	ForecastDetailComponent,
	TimelineComponent,
	TimelineForecastComponent,
} from './components';
import { ForecastMetaModule } from './meta/index';


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
		ForecastStoreModule,
		ForecastMetaModule,
		ConductorModule,
	],
})
export class ForecastModule { }
