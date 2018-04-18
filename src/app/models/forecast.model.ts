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
	) {
		const cityComponent = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'locality'));
		this.city = !!cityComponent ? cityComponent.long_name : '';
		const countryComponent = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'country'));
		this.country = !!countryComponent ? countryComponent.long_name : '';

		const seedKey = `${this.geocode.place_id}${this.date.toISOString()}`;
		const random = new Randomizer(seedKey);
		this.temperature = Math.floor(20 + 7 * random.next());
	}
}
export enum Weather {
	sunny = 'sunny',
	rainy = 'rainy',
}
