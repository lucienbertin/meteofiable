import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IGmapApiResponse, IGmapGeocode } from 'app/models';
const MAGIC_KEY = 'AIzaSyBk8hm7dZFrmiq9BmgKVcfv_NiMigtKPjY';
@Injectable()
export class GmapService {
	private geocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json';
	private placeApi = 'https://maps.googleapis.com/maps/api/place/details/json';
	constructor(
		private http: HttpClient,
	) {}

	searchAddresses(clue = ''): Observable<IGmapGeocode[]> {
		const transformedClue = clue.replace(' ', '+');
		return this.http.get<IGmapApiResponse>(`${this.geocodeApi}?address=${transformedClue}&key=${MAGIC_KEY}`)
		.map(response => response.results);
	}
	getPlace(id): Observable<IGmapGeocode> {
		return this.http.get<IGmapApiResponse>(`${this.placeApi}?placeid=${id}&key=${MAGIC_KEY}`)
		.map(response => response.result);
	}
}
