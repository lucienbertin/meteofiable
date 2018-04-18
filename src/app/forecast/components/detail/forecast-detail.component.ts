import { Component, OnInit, Input } from '@angular/core';

import { IForecast } from 'app/models';

@Component({
	selector: 'mf-forecast-detail',
	templateUrl: 'forecast-detail.component.html',
	styleUrls: ['forecast-detail.component.scss'],
	moduleId: module.id,
})
export class ForecastDetailComponent {
	@Input() forecast: IForecast;
	constructor(
	) {}
}
