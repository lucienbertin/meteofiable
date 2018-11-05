import { Component, Input } from '@angular/core';

import { IForecast } from '@meteo/models';

@Component({
	selector: 'mf-timeline-forecast',
	templateUrl: 'timeline-forecast.component.html',
	styleUrls: ['timeline-forecast.component.scss'],
})
export class TimelineForecastComponent {
	@Input() forecast: IForecast;
	constructor(
	) {}
}
