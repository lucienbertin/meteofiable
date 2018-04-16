import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationStoreModule, DateStoreModule } from 'app/common';

import {
	ForecastComponent,
} from './components';


@NgModule({
	declarations: [
		ForecastComponent,
	],
	exports: [
		ForecastComponent,
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
