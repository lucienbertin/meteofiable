import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GmapModule } from '@meteo/core';
import { LocationStoreModule, DateStoreModule } from '@meteo/store';

import {
	MfFormComponent,
} from './components';
import { CommandsModule } from '@lucca-front-sdk/ng/ngrx';


@NgModule({
	declarations: [
		MfFormComponent,
	],
	exports: [
		MfFormComponent,
	],
	imports: [
		CommonModule,
		MatMomentDateModule,
		MatAutocompleteModule,
		MatOptionModule,
		MatDatepickerModule,
		FormsModule,
		LocationStoreModule,
		DateStoreModule,
		GmapModule,
		CommandsModule,
	],
	providers: [
	],
})
export class MfFormModule { }
