import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Moment } from 'moment';

import { DateEffect } from './date.effect';
import { DateDataEffect } from './date.data';
import { dateReducer } from './date.reducer';
export interface IDateStore {
	date: Moment;
}

@NgModule({
	imports: [
		StoreModule.forFeature('date', dateReducer),
		EffectsModule.forFeature([DateEffect, DateDataEffect]),
	],
	exports: [
		StoreModule,
	],
	providers: [
	],
})
export class DateStoreModule { }
