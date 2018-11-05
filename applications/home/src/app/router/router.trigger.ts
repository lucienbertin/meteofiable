import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { debounceTime, withLatestFrom, tap, map } from 'rxjs/operators';
import { MfActions, AAction, AEvent } from '@meteo/core';
import { IGmapGeocode } from '@meteo/models';
import { Moment } from 'moment';
import { SetDateEvt, SetGeocodeEvt, ILocationStore, IDateStore } from '@meteo/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect } from '@ngrx/effects';

class UpdateUrlAction extends AAction<void> {
	constructor(location?: IGmapGeocode, date?: Moment) {
		super(
			'[norm] update url',
			undefined,
			{ location: location, date: date }
		);
	}
}
class UpdateUrlEvt extends AEvent<void> {
	constructor() {
		super('[evt] update url');
	}
}
@Injectable()
export class RouterTrigger {
	locUpdated = this.actions$.of(new SetGeocodeEvt());
	dateUpdated = this.actions$.of(new SetDateEvt());

	updateUrlTrigger = merge(
		this.locUpdated,
		this.dateUpdated,
	).pipe(
		debounceTime(500),
		withLatestFrom(this.store$.select(s => s.location), this.store$.select(s => s.date)),
	);

	@Effect() updateUrlHandler = this.updateUrlTrigger
		.pipe(map(([action, location, date]) => new UpdateUrlAction(location, date)));

	@Effect() updateUrlEvt = this.actions$.of(new UpdateUrlAction())
		.pipe(
			tap(a => {
				const params = {
					date: a.payload.date.format('YYYY-MM-DD'),
					place: a.payload.location.place_id,
				};
				this.router.navigate([], { queryParams: params, replaceUrl: true, relativeTo: this.route });
			}),
			map(a => new UpdateUrlEvt()),
		);

	constructor(
		private actions$: MfActions,
		private router: Router,
		private route: ActivatedRoute,
		private store$: Store<ILocationStore & IDateStore>,
	) { }
}
