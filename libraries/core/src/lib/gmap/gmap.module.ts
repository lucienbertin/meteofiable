import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GmapService } from './gmap.service';

@NgModule({
	imports: [
		HttpClientModule,
	],
	providers: [
		GmapService,
	],
})
export class GmapModule { }
