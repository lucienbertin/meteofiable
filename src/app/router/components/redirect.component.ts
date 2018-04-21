import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IGmapGeocode } from 'app/models';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetPlaceIdCmd, SetDateCmd } from 'app/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { paris_id } from './redirect.bogus';

@Component({
	selector: 'mf-redirect',
	template: '',
	styleUrls: [],
	moduleId: module.id,
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
			// tomorrow
			this.store$.dispatch(new SetDateCmd(moment().add(1, 'd').startOf('d')));
		}
	}
}
