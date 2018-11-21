import { Injectable } from '@angular/core';
import { merge, of } from 'rxjs';
import { debounceTime, withLatestFrom, tap, map } from 'rxjs/operators';
import { IGmapGeocode, IForecast, Weather } from '@meteo/models';
import { Moment } from 'moment';
import { SetDateEvt, IDateStore } from '../date/index';
import { SetGeocodeEvt, ILocationStore } from '../location/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ofType, ofSuccess, AAction, AEvent, ACommand, follow, ARequest, call, correlated, ofAny, trigger } from '@lucca-front-sdk/ng/ngrx';
import { ForecastFactory } from './forecast.factory';
import { SetForecastsCmd } from './forecast.command';

class CreateForecastsRequest extends ARequest<{location: IGmapGeocode, date: Moment}, IForecast[]> {
	static TYPE = '[req] date & loc -> forcasts';
	call([factory]: [ForecastFactory]) {
		return of(factory.forge(this.payload.location, this.payload.date));
	}
}

@Injectable()
export class ForecastTrigger {
	locUpdated = this.actions$.pipe(
		ofSuccess(SetGeocodeEvt)
	);
	dateUpdated = this.actions$.pipe(
		ofSuccess(SetDateEvt),
	);

	updateForecastsTrigger = merge(
		this.locUpdated,
		this.dateUpdated,
	).pipe(
		debounceTime(50),
		withLatestFrom(this.store$.select(s => s.location), this.store$.select(s => s.date)),
	);

	@Effect() trigger = this.updateForecastsTrigger.pipe(
		map(([action, location, date]) => new CreateForecastsRequest({location: location, date: date})),
		call(CreateForecastsRequest, this.factory),
		trigger(SetForecastsCmd, f => f),
	);

	constructor(
		private actions$: Actions,
		private store$: Store<ILocationStore & IDateStore>,
		private factory: ForecastFactory,
	) { }
}
