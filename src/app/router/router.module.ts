import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationStoreModule, DateStoreModule } from 'app/common';

import {
	RedirectComponent,
} from './components';
import { redirectRoute } from './router.route';
import { RouterTrigger } from './router.trigger';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		RedirectComponent,
	],
	exports: [
		RedirectComponent,
	],
	imports: [
		CommonModule,
		LocationStoreModule,
		DateStoreModule,
		RouterModule,
		EffectsModule.forFeature([RouterTrigger]),
	],
	providers: [
	],
})
export class MfRouterModule { }
