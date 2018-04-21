import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { Store } from '@ngrx/store';
import { IGmapGeocode, IForecast, Forecast, Weather } from 'app/models';
import { ILocationStore, IDateStore } from 'app/common';
const timeline = [
	{ d: -1, weather: Weather.rainy  },
	{ d: 0, weather: Weather.sunny },
	{ d: 1, weather: Weather.sunny  },
	{ d: 2, weather: Weather.cloudy },
	{ d: 3, weather: undefined },
	{ d: 4, weather: undefined },
	{ d: 5, weather: undefined },
];
@Component({
	selector: 'mf-timeline',
	templateUrl: 'timeline.component.html',
	styleUrls: ['timeline.component.scss'],
	moduleId: module.id,
})
export class TimelineComponent implements OnInit {
	location$: Observable<IGmapGeocode>;
	date$: Observable<moment.Moment>;
	timeline$: Observable<IForecast[]>;
	constructor(
		private store$: Store<ILocationStore & IDateStore>,
	) {}
	ngOnInit() {
		this.initObs();
	}
	initObs() {
		this.initStoreObs();
		this.initTimelineObs();
	}
	initStoreObs() {
		this.location$ = this.store$.select(s => s.location).delay(0);
		this.date$ = this.store$.select(s => s.date).delay(0);
	}
	initTimelineObs() {
		this.timeline$ = Observable.combineLatest(
			this.location$,
			this.date$,
			(geocode, date) => {
				if (!!geocode && !!date) {
					return timeline.map(t => new Forecast(geocode, moment(date).add(t.d, 'days'), t.weather));
				}
				return [];
			}
		);
	}
}
