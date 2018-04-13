import { Component } from '@angular/core';
import { AddressService } from '../address.service';

@Component({
	selector: 'mf-form',
	templateUrl: 'form.component.html',
	styleUrls: ['form.component.scss'],
	moduleId: module.id,
})
export class MfFormComponent {
	model = {};
	constructor(
		private addressService: AddressService,
	) {}
	submit() {

	}
	searchAddress(clue = '') {

	}
}
