import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'mf-form',
	templateUrl: 'form.component.html',
	styleUrls: ['form.component.scss'],
	moduleId: module.id,
})
export class MfFormComponent {
	model = {};
	adresses = [];

	constructor(
		private addressService: AddressService,
	) {}
	submit() {

	}
	searchAddresses(clue = '') {
		this.addressService.searchAddresses(clue)
		.subscribe(results => this.adresses = results);
	}
}
