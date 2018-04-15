import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActionModule } from 'app/core';
import { GmapModule } from '../../gmap';

import { LocationEffect } from './location.effect';
import { LocationDataEffect } from './location.data';
import { locationReducer } from './location.reducer';
import { IGmapGeocode } from 'app/models';
export interface ILocationStore {
	location: IGmapGeocode;
}

@NgModule({
	imports: [
		StoreModule.forFeature('location', locationReducer),
		EffectsModule.forFeature([LocationEffect, LocationDataEffect]),
		ActionModule,
		GmapModule,
	],
	exports: [
		StoreModule,
	],
	providers: [
	],
})
export class LocationStoreModule { }
