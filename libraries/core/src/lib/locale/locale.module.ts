import { NgModule, LOCALE_ID } from '@angular/core';
import * as moment from 'moment';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@NgModule({
	imports: [
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr' }
	],
})
export class LocaleModule {
	constructor() {
		moment.locale('fr');
		registerLocaleData(localeFr);
	}
}
