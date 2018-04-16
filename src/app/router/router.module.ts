import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationStoreModule, DateStoreModule } from 'app/common';

import {
	RedirectComponent,
} from './components';
import { redirectRoute } from './router.route';


@NgModule({
	declarations: [
		RedirectComponent,
	],
	exports: [
		RedirectComponent,
		RouterModule,
	],
	imports: [
		CommonModule,
		LocationStoreModule,
		DateStoreModule,
		// RouterModule.forChild(redirectRoute),
		// RouterModule,
	],
	providers: [
	],
})
export class MfRouterModule { }
