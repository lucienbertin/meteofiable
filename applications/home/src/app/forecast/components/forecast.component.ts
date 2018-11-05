import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Moment } from 'moment';

import { Store } from '@ngrx/store';
import { IGmapGeocode, IForecast, Forecast, Weather } from '@meteo/models';
import { ILocationStore, IDateStore } from '@meteo/store';

@Component({
	selector: 'mf-forecast',
	templateUrl: 'forecast.component.html',
	styleUrls: ['forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
	location$: Observable<IGmapGeocode>;
	date$: Observable<Moment>;
	forecast$: Observable<IForecast>;
	constructor(
		private store$: Store<ILocationStore & IDateStore>,
	) {}
	ngOnInit() {
		this.initObs();
	}
	initObs() {
		this.initStoreObs();
		this.initForecastObs();
	}
	initStoreObs() {
		this.location$ = this.store$.select(s => s.location).pipe(delay(0));
		this.date$ = this.store$.select(s => s.date).pipe(delay(0));
	}
	initForecastObs() {
		this.forecast$ = combineLatest(
			this.location$,
			this.date$,
			(geocode, date) => {
				if (!!geocode && !!date) {
					return new Forecast(geocode, date, Weather.sunny);
				}
				return undefined;
			}
		)
	}
}
