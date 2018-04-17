import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IGmapGeocode } from 'app/models';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetPlaceIdCmd, SetDateCmd } from 'app/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
		}
		if (!!params.date) {
			const date = moment(params.date);
			this.store$.dispatch(new SetDateCmd(date));
		}
	}
}
