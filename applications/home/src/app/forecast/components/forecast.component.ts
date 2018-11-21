import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IForecast } from '@meteo/models';
import { selectCurrentForecast } from '@meteo/store';

@Component({
	selector: 'mf-forecast',
	templateUrl: 'forecast.component.html',
	styleUrls: ['forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
	forecast$: Observable<IForecast>;
	constructor(
		private store$: Store<any>,
	) {}
	ngOnInit() {
		this.initObs();
	}
	initObs() {
		this.initForecastObs();
	}
	initForecastObs() {
		this.forecast$ = this.store$.pipe(
			select(selectCurrentForecast),
		);
	}
}
