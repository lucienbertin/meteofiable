import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule, MatDatepickerModule } from '@angular/material';

import {

} from './components';
import { AddressService } from './address.service';


@NgModule({
	declarations: [
	],
	imports: [
		BrowserModule,
		MatAutocompleteModule,
		MatOptionModule,
		MatDatepickerModule,
	],
	providers: [
		AddressService,
	],
})
export class MfFormModule { }
