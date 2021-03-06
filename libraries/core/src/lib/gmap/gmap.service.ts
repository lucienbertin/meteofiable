import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGmapApiResponse, IGmapGeocode } from '@meteo/models';
const MAGIC_KEY = 'AIzaSyBk8hm7dZFrmiq9BmgKVcfv_NiMigtKPjY';
@Injectable()
export class GmapService {
	private geocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json';
	constructor(
		private http: HttpClient,
	) {}

	searchAddresses(clue = ''): Observable<IGmapGeocode[]> {
		const transformedClue = clue.replace(' ', '+');
		return this.http.get<IGmapApiResponse>(`${this.geocodeApi}
		?components=country:fr
		&location_type=locality
		&address=${transformedClue}
		&key=${MAGIC_KEY}`)
		.pipe(map(response => response.results));
	}
	getPlace(id): Observable<IGmapGeocode> {
		return this.http.get<IGmapApiResponse>(`${this.geocodeApi}?place_id=${id}&key=${MAGIC_KEY}`)
		.pipe(map(response => response.results[0]));
	}
}
