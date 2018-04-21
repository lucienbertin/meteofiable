import { IGmapGeocode } from './gmap.model';
import { Moment } from 'moment';

import { Randomizer } from './randomizer';

export interface IForecast {
	geocode: IGmapGeocode;
	date: Moment;
	weather: Weather;
	temperature: number;
	city: string;
	country: string;
}
export class Forecast implements IForecast {
	city: string;
	country: string;
	constructor(
		public geocode: IGmapGeocode,
		public date: Moment,
		public weather = Weather.sunny,
		public temperature = 25,
		public wind = 5,
		public humidity = 35,
	) {
		const cityComponent = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'locality'));
		this.city = !!cityComponent ? cityComponent.long_name : '';
		const countryComponent = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'country'));
		this.country = !!countryComponent ? countryComponent.long_name : '';

		const seedKey = `${this.geocode.place_id}${this.date.toISOString()}`;
		// random stuff
		const random = new Randomizer(seedKey);
		this.temperature = Math.floor(20 + 7 * random.next());
		this.wind = Math.floor(10 * random.next());
		this.humidity = Math.floor(20 + 30 * random.next());

		if (this.weather === Weather.rainy) {
			this.temperature -= 10;
			this.wind += 20;
			this.humidity += 30;
		}
	}
}
export enum Weather {
	sunny = 'sunny',
	cloudy = 'cloudy',
	rainy = 'rainy',
}
