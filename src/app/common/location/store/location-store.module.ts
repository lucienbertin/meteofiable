import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActionModule } from 'app/core';

import { LocationEffect } from './location.effect';

@NgModule({
	imports: [
		StoreModule,
		EffectsModule.forFeature([LocationEffect]),
		ActionModule,
	],
	exports: [
		StoreModule,
	],
	providers: [
	],
})
export class LocationStoreModule { }
