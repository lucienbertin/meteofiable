import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Store } from '@ngrx/store';
import { Form, NgForm } from '@angular/forms';

import { IGmapGeocode, IForecast, Forecast } from '@meteo/models';
import { GmapService } from '@meteo/core';
import { SetAdressCmd, SetDateCmd, ILocationStore, IDateStore } from '@meteo/store';

@Component({
	selector: 'mf-form',
	templateUrl: 'form.component.html',
	styleUrls: ['form.component.scss'],
})
export class MfFormComponent implements OnInit, OnDestroy {
	@Input() touchUi = false;
	subs = new Subscription();
	location$: Observable<IGmapGeocode>;
	date$: Observable<Moment>;
	model: { address?: string, date?: Moment } = {};
	adresses = [];
	min = moment().startOf('d');
	@ViewChild('addressInput') addressInput: ElementRef;
	@ViewChild('dateInput') dateInput: ElementRef;
	@ViewChild('form') form: NgForm;

	constructor(
		private gmapService: GmapService,
		private store$: Store<ILocationStore & IDateStore>,
	) {}

	ngOnInit() {
		this.location$ = this.store$.select(s => s.location).pipe(delay(0));
		this.date$ = this.store$.select(s => s.date).pipe(delay(0));
		this.subs.add(this.location$.subscribe(l => this.model.address = !!l ? l.formatted_address : ''));
		this.subs.add(this.date$.subscribe(d => this.model.date = moment(d)));
	}
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
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
		of({})
		.pipe(
			delay(1) // need timeout here because shenanigans
		)
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
