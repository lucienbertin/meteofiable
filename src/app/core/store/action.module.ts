import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MfActions } from './action.injectable';

@NgModule({
	imports: [
		StoreModule,
		EffectsModule,
	],
	providers: [
		MfActions,
	],
})
export class ActionModule { }
