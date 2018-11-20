// import { ACommand } from '@meteo/core';
import { IGmapGeocode, IGmapLocation } from '@meteo/models';
import { ACommand } from '@lucca-front-sdk/ng/ngrx';

export class SetAdressCmd extends ACommand<string, IGmapGeocode> {
	static TYPE = '[cmd] set address';
	// constructor(address: string = '') {
	// 	super(
	// 		'[cmd] set address',
	// 		undefined,
	// 		{ address: address },
	// 	);
	// }
}
export class SetPlaceIdCmd extends ACommand<string, IGmapGeocode> {
	static TYPE = '[cmd] set place id';
	// constructor(placeId?: string) {
	// 	super(
	// 		'[cmd] set place id',
	// 		undefined,
	// 		{ placeId: placeId },
	// 	);
	// }
}
