import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddressService } from '../address.service';
import { Observable } from 'rxjs/Observable';
import { MatDatepicker } from '@angular/material';
import 'rxjs/add/operator/delay';

@Component({
	selector: 'mf-form',
	templateUrl: 'form.component.html',
	styleUrls: ['form.component.scss'],
	moduleId: module.id,
})
export class MfFormComponent {
	model = {};
	adresses = [];
	@ViewChild('addressInput') addressInput: ElementRef;
	@ViewChild('dateInput') dateInput: ElementRef;
	
	constructor(
		private addressService: AddressService,
	) {}
	submit() {

	}
	searchAddresses(clue = '') {
		this.addressService.searchAddresses(clue)
		.subscribe(results => this.adresses = results);
	}

	openPicker(picker: MatDatepicker<any>) {
		if (!picker.opened) {
			picker.open();
			this.refocusInput();
		}
	}
	closePicker(picker: MatDatepicker<any>) {
		if (picker.opened) {
			picker.close();
		}
	}
	togglePicker(picker: MatDatepicker<any>) {
		if (!picker.opened) {
			picker.open();
			this.refocusInput();
		} else {
			picker.close();
		}
	}
	onTab(picker: MatDatepicker<any>) {
		picker.close();
	}
	onEnter(picker: MatDatepicker<any>) {
		picker.close();
	}
	onEscape(picker: MatDatepicker<any>) {
		picker.close();
	}
	private refocusInput() {
		Observable.of({})
			.delay(1) // need timeout here because shenanigans
			.subscribe(() => {
				this.dateInput.nativeElement.focus();
			});
	}
	focus(picker: MatDatepicker<any>) {
		this.openPicker(picker);
	}
	blur() {
		// this.to._isFocused = false;
	}
}