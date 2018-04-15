import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActionModule } from 'app/core';
import { GmapModule } from '../../gmap';

import { LocationEffect } from './location.effect';

@NgModule({
	imports: [
		StoreModule,
		EffectsModule.forFeature([LocationEffect]),
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
