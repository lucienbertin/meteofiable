import { Injectable } from '@angular/core';
import { merge, of } from 'rxjs';
import { debounceTime, withLatestFrom, tap, map } from 'rxjs/operators';
import { IGmapGeocode } from '@meteo/models';
import { Moment } from 'moment';
import { SetDateEvt, SetGeocodeEvt, ILocationStore, IDateStore } from '@meteo/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ofPending, ofSuccess, AEvent, ACommand, callAndFollow, correlated, ofComplete, complete, IAction } from '@lucca-front-sdk/ng/ngrx';

class UpdateUrlCmd extends ACommand<{ location: IGmapGeocode, date: Moment, }> {
	static TYPE = '[cmd] update url';
}

class UpdateUrlEvt extends AEvent<{ location: IGmapGeocode, date: Moment, }> {
	static TYPE = '[evt] update url';
}
@Injectable()
export class RouterTrigger {
	locUpdated = this.actions$.pipe(
		ofSuccess(SetGeocodeEvt)
	);
	dateUpdated = this.actions$.pipe(
		ofSuccess(SetDateEvt),
	);

	updateUrlTrigger = merge(
		this.locUpdated,
		this.dateUpdated,
	).pipe(
		debounceTime(500),
		withLatestFrom(this.store$.select(s => s.location), this.store$.select(s => s.date)),
		tap(x => console.log(x))
	);

	@Effect() trigger = this.updateUrlTrigger
		.pipe(map(([action, location, date]) => new UpdateUrlCmd({location: location, date: date})));

	@Effect() handler = this.actions$.pipe(
		ofPending(UpdateUrlCmd),
		callAndFollow(p => {
			const params = {
				date: p.date.format('YYYY-MM-DD'),
				place: p.location.place_id,
			};
			this.router.navigate([], { queryParams: params, replaceUrl: true, relativeTo: this.route });
			return of(p);
		}, UpdateUrlEvt),
	);

	@Effect() complete = this.actions$.pipe(
		correlated(UpdateUrlCmd),
		ofComplete(UpdateUrlEvt),
		complete(UpdateUrlCmd),
		);
	constructor(
		private actions$: Actions<IAction>,
		private router: Router,
		private route: ActivatedRoute,
		private store$: Store<ILocationStore & IDateStore>,
	) { }
}
