import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MfFormModule } from './form';
import { ForecastModule } from './forecast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { MfRouterModule, redirectRoute } from './router';
import { LocaleModule } from '@meteo/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		MfFormModule,
		ForecastModule,
		RouterModule.forRoot(redirectRoute),
		MfRouterModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			name: 'meteo-fiable',
		}),
		LocaleModule,
		BrowserAnimationsModule,
	],
	providers: [
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
