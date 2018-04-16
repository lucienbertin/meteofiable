import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDatepicker } from '@angular/material';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Moment } from 'moment';

import { SetAdressCmd, GmapService, SetDateCmd } from 'app/common';
import { Store } from '@ngrx/store';
import { Form, NgForm } from '@angular/forms';

@Component({
	selector: 'mf-form',
	templateUrl: 'form.component.html',
	styleUrls: ['form.component.scss'],
	moduleId: module.id,
})
export class MfFormComponent {
	model: { address?: string, date?: Moment } = {};
	adresses = [];
	cities = [];
	@ViewChild('addressInput') addressInput: ElementRef;
	@ViewChild('dateInput') dateInput: ElementRef;
	@ViewChild('form') form: NgForm;

	constructor(
		private gmapService: GmapService,
		private store$: Store<any>,
	) {}
	submit() {
		if (this.form.valid) {
			this.store$.dispatch(new SetAdressCmd(this.model.address));
			this.store$.dispatch(new SetDateCmd(this.model.date));
		}
	}
	searchAddresses(clue = '') {
		this.gmapService.searchAddresses(clue)
		.subscribe(results => {
			this.adresses = results.map(r => r.formatted_address);
			this.cities = results.map(r => r.address_components.find(ac => !!ac.types.find(t => t === 'locality')).long_name);
		});
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
