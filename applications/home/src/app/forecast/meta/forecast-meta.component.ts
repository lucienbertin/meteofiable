import { Component, Input } from '@angular/core';
import { IForecast } from '@meteo/models';

import { Meta } from '@angular/platform-browser';

@Component({
	selector: 'mf-forecast-meta',
	template: '',
	styleUrls: [],
})
export class ForecastMetaComponent {
	@Input() set forecast(f: IForecast) {
		this.updateMeta(f);
	}
	constructor(
		private meta: Meta,
	) {}
	updateMeta(forecast: IForecast) {
		if (!!forecast) {
			this.meta.updateTag({ property: 'og:title', content: `${forecast.city} ${forecast.date.format('ll')}` });
			this.meta.updateTag({ property: 'og:description', content: `${forecast.temperature}ºC grand soleil` });
		}
	}
}
