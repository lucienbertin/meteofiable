import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Actions } from './action.injectable';

@NgModule({
	imports: [
		StoreModule,
		EffectsModule,
	],
	providers: [
		Actions,
	],
})
export class ActionModule { }
