import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IForecast } from '@meteo/models';
import { selectForecasts } from '@meteo/store';
@Component({
	selector: 'mf-timeline',
	templateUrl: 'timeline.component.html',
	styleUrls: ['timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
	timeline$: Observable<IForecast[]>;
	constructor(
		private store$: Store<any>,
	) {}
	ngOnInit() {
		this.initTimelineObs();
	}
	initTimelineObs() {
		this.timeline$ = this.store$.pipe(
			select(selectForecasts),
		);
	}
}
