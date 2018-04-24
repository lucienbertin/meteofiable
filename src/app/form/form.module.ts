import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStoreModule, GmapModule, DateStoreModule } from 'app/common';

import {
	MfFormComponent,
} from './components';


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
		NoopAnimationsModule,
	],
	providers: [
	],
})
export class MfFormModule { }
