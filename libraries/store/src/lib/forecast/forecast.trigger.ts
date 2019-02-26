import { Injectable } from '@angular/core';
import { merge, of, Observable } from 'rxjs';
import { debounceTime, withLatestFrom, tap, map } from 'rxjs/operators';
import { IGmapGeocode, IForecast, Weather } from '@meteo/models';
import { Moment } from 'moment';
import { SetDateEvt, IDateStore } from '../date/index';
import { SetGeocodeEvt, ILocationStore } from '../location/index';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ofSuccess, AAction, trigger, callAndFollow } from '@lucca-front-sdk/ng/ngrx';
import { ForecastFactory } from './forecast.factory';
import { SetForecastsCmd } from './forecast.command';

class CreateForecastsTrigger extends AAction<IForecast[]> {
	static TYPE = '[trig] date & loc -> forcasts';
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
		map(([action, location, date]) => new CreateForecastsTrigger(this.factory.forge(location, date))),
		trigger(SetForecastsCmd, (p, f) => f),
	);

	constructor(
		private actions$: Actions,
		private store$: Store<ILocationStore & IDateStore>,
		private factory: ForecastFactory,
	) { }
}
