import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AddressService {
	constructor(
		private http: HttpClient,
	) {}

	searchAddresses(clue = '') {
		return Observable.of([clue + ' lol']);
	}
}
