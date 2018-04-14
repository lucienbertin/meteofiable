import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { IGmapApiResponse } from 'app/common';

@Injectable()
export class AddressService {
	private gmapApi = 'https://maps.googleapis.com/maps/api/geocode/json';
	constructor(
		private http: HttpClient,
	) {}

	searchAddresses(clue = '') {
		const transformedClue = clue.replace(' ', '+')
		return this.http.get<IGmapApiResponse>(`${this.gmapApi}?address=${transformedClue}`)
		.map(response => {
			return response.results.map(r => r.formatted_address);
		});
	}
}
