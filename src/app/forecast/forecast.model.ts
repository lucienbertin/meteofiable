import { IGmapGeocode } from '../common';
import { Moment } from 'moment';

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
		public temperature = 25) {
			this.city = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'locality')).short_name;
			this.country = this.geocode.address_components.find(ac => !!ac.types.find(t => t === 'country')).short_name;
		}
}
export enum Weather {
	sunny = 'sunny',
	rainy = 'rainy',
}
