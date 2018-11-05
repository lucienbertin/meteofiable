import { Component, Input } from '@angular/core';

import { IForecast } from '@meteo/models';

@Component({
	selector: 'mf-forecast-detail',
	templateUrl: 'forecast-detail.component.html',
	styleUrls: ['forecast-detail.component.scss'],
})
export class ForecastDetailComponent {
	@Input() forecast: IForecast;
	constructor(
	) {}
}
