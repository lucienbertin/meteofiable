import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetPlaceIdCmd, SetDateCmd } from '@meteo/store';
import { BehaviorSubject } from 'rxjs';
import { paris_id } from './redirect.bogus';

@Component({
	selector: 'mf-redirect',
	template: '',
	styleUrls: [],
})
export class RedirectComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private store$: Store<{}>
	) {}
	ngOnInit() {
		const params = (this.route.queryParams as BehaviorSubject<any>).getValue();
		if (!!params.place) {
			const place = params.place;
			this.store$.dispatch(new SetPlaceIdCmd(place));
		} else {
			// paris
			this.store$.dispatch(new SetPlaceIdCmd(paris_id));
		}
		if (!!params.date) {
			const date = moment(params.date);
			this.store$.dispatch(new SetDateCmd(date));
		} else {
			// today if we're checking in the morning, tomorrow if not
			this.store$.dispatch(new SetDateCmd(moment().add(12, 'hours').startOf('d')));
		}
	}
}
