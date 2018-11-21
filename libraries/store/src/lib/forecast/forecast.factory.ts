import { Weather, IGmapGeocode, Forecast } from '@meteo/models';
import { Moment } from 'moment';
import * as  _moment from 'moment';
const moment = _moment;
import { Injectable } from '@angular/core';

@Injectable()
export class ForecastFactory {
	protected timeline = [
		{ d: -1, weather: Weather.rainy  },
		{ d: 0, weather: Weather.sunny },
		{ d: 1, weather: Weather.sunny  },
		{ d: 2, weather: Weather.cloudy },
		{ d: 3, weather: undefined },
		{ d: 4, weather: undefined },
		{ d: 5, weather: undefined },
	];
	forge(geocode: IGmapGeocode, date: Moment) {
		if (!!geocode && !!date) {
			return this.timeline.map(t => new Forecast(geocode, moment(date).add(t.d, 'days'), t.weather));
		}
		return [];
	}
}
