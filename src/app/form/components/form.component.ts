import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDatepicker } from '@angular/material';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Moment } from 'moment';

import { SetAdressCmd, GmapService } from 'app/common';
import { Store } from '@ngrx/store';

@Component({
	selector: 'mf-form',
	templateUrl: 'form.component.html',
	styleUrls: ['form.component.scss'],
	moduleId: module.id,
})
export class MfFormComponent {
	model: { address?: string, date?: Moment } = {};
	adresses = [];
	@ViewChild('addressInput') addressInput: ElementRef;
	@ViewChild('dateInput') dateInput: ElementRef;

	constructor(
		private gmapService: GmapService,
		private store$: Store<any>,
	) {}
	submit() {
		console.log(`address: ${this.model.address} | date: ${this.model.date.format('ll')}`);
		this.store$.dispatch(new SetAdressCmd(this.model.address));
	}
	searchAddresses(clue = '') {
		this.gmapService.searchAddresses(clue)
		.subscribe(results => this.adresses = results.map(r => r.formatted_address));
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
