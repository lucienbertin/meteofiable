import { Component, OnInit, Input } from '@angular/core';

import { IForecast } from 'app/models';

@Component({
	selector: 'mf-timeline-forecast',
	templateUrl: 'timeline-forecast.component.html',
	styleUrls: ['timeline-forecast.component.scss'],
	moduleId: module.id,
})
export class TimelineForecastComponent {
	@Input() forecast: IForecast;
	constructor(
	) {}
}
