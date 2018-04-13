import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';


import { AppComponent } from './app.component';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MatAutocompleteModule,
		MatOptionModule,
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
