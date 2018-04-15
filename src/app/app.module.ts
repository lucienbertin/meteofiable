import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MfFormModule } from './form';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		MfFormModule,

		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({}),
	],
	providers: [
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
