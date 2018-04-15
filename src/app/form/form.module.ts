import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationStoreModule } from 'app/common';

import {
	MfFormComponent,
} from './components';
import { AddressService } from './address.service';


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
		HttpClientModule,
		LocationStoreModule,
	],
	providers: [
		AddressService,
	],
})
export class MfFormModule { }
