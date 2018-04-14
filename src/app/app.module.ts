import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MfFormModule } from './form';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		MfFormModule,
	],
	providers: [
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
