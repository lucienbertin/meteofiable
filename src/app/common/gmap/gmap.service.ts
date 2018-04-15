import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IGmapApiResponse, IGmapGeocode } from 'app/models';

@Injectable()
export class GmapService {
	private gmapApi = 'https://maps.googleapis.com/maps/api/geocode/json';
	constructor(
		private http: HttpClient,
	) {}

	searchAddresses(clue = ''): Observable<IGmapGeocode[]> {
		const transformedClue = clue.replace(' ', '+');
		return this.http.get<IGmapApiResponse>(`${this.gmapApi}?address=${transformedClue}`)
		.map(response => response.results);
	}
}