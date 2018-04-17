import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MfFormModule } from './form';
import { ForecastModule } from './forecast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { MfRouterModule, redirectRoute } from './router';
import { LocaleModule } from './locale';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		MfFormModule,
		ForecastModule,
		RouterModule.forRoot(redirectRoute),
		MfRouterModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({}),
		LocaleModule,
	],
	providers: [
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
