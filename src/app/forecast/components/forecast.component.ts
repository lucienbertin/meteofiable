import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/combineLatest';
import { Moment } from 'moment';

import { Store } from '@ngrx/store';
import { IGmapGeocode, IForecast, Forecast, Weather } from 'app/models';
import { ILocationStore, IDateStore } from 'app/common';

@Component({
	selector: 'mf-forecast',
	templateUrl: 'forecast.component.html',
	styleUrls: ['forecast.component.scss'],
	moduleId: module.id,
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
		this.location$ = this.store$.select(s => s.location).delay(0);
		this.date$ = this.store$.select(s => s.date).delay(0);
	}
	initForecastObs() {
		this.forecast$ = Observable.combineLatest(
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
