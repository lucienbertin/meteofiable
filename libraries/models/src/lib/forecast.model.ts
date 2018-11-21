import { IGmapGeocode } from './gmap.model';
import { Moment } from 'moment';

import { Randomizer } from './randomizer';

export interface IForecast {
	id: string;
	geocode: IGmapGeocode;
	date: Moment;
	weather?: Weather;
	temperature?: number;
	wind?: number;
	humidity?: number;
	city: string;
	country: string;
}
export class Forecast implements IForecast {
	id: string;
	city: string;
	country: string;
	constructor(
		public geocode: IGmapGeocode,
		public date: Moment,
		public weather?: Weather,
		public temperature = 25,
		public wind = 10,
		public humidity = 35,
	) {
		this.id = `${geocode.place_id} - ${date.toISOString()}`;
		const cityComponent = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'locality'));
		this.city = !!cityComponent ? cityComponent.long_name : '';
		const countryComponent = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'country'));
		this.country = !!countryComponent ? countryComponent.long_name : '';

		const seedKey = `${this.geocode.place_id}${this.date.toISOString()}`;
		// random stuff
		const random = new Randomizer(seedKey);
		this.temperature = Math.floor(23 + 4 * random.next());
		this.wind = 5 + Math.floor(10 * random.next());
		this.humidity = Math.floor(20 + 30 * random.next());
		if (!this.weather) {
			this.weather = random.next() > .5 ? Weather.cloudy : Weather.sunny;
		}
		if (this.weather === Weather.rainy) {
			this.temperature -= 10;
			this.wind += 20;
			this.humidity += 30;
		}
		if (this.weather === Weather.cloudy) {
			this.temperature -= 2;
			this.wind += 10;
		}
	}
}
export enum Weather {
	sunny = 'sunny',
	cloudy = 'cloudy',
	rainy = 'rainy',
}
