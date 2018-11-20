import { Injectable } from '@angular/core';
import { merge, of } from 'rxjs';
import { debounceTime, withLatestFrom, tap, map } from 'rxjs/operators';
import { IGmapGeocode } from '@meteo/models';
import { Moment } from 'moment';
import { SetDateEvt, SetGeocodeEvt, ILocationStore, IDateStore } from '@meteo/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ofType, ofSuccess, AAction, AEvent, ACommand, follow, ARequest, call, correlated, ofAny } from '@lucca-front-sdk/ng/ngrx';

class UpdateUrlCmd extends ACommand<{ location: IGmapGeocode, date: Moment, }> {
	static TYPE = '[cmd] update url';
}
class UpdateUrlRequest extends ARequest<{ location: IGmapGeocode, date: Moment, }> {
	static TYPE = '[req] update url';
	call(router: Router, route: ActivatedRoute) {
		const params = {
			date: this.payload.date.format('YYYY-MM-DD'),
			place: this.payload.location.place_id,
		};
		router.navigate([], { queryParams: params, replaceUrl: true, relativeTo: route });
		return of(this.payload);
	}
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
	);

	@Effect() trigger = this.updateUrlTrigger
		.pipe(map(([action, location, date]) => new UpdateUrlCmd({location: location, date: date})));

	@Effect() handler = this.actions$.pipe(
		ofType(UpdateUrlCmd),
		follow(UpdateUrlRequest),
	);
	@Effect() caller = this.handler.pipe(
		call(UpdateUrlRequest, this.router, this.route),
		follow(UpdateUrlEvt),
	);
	@Effect() complete = this.actions$.pipe(
		correlated(UpdateUrlCmd),
		ofAny(UpdateUrlEvt),
		follow(UpdateUrlCmd),
		);
	constructor(
		private actions$: Actions,
		private router: Router,
		private route: ActivatedRoute,
		private store$: Store<ILocationStore & IDateStore>,
	) { }
}
