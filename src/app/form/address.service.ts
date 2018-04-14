import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class AddressService {
	private gmapApi = 'https://maps.googleapis.com/maps/api/geocode/json';
	constructor(
		private http: HttpClient,
	) {}

	searchAddresses(clue = '') {
		const transformedClue = clue.replace(' ', '+')
		return this.http.get(`${this.gmapApi}?address=${transformedClue}`)
		.map((response: any) => {
			return response.results.map(r => r.formatted_address);
		});
		// return Observable.of([clue + ' lol']);
	}
}
