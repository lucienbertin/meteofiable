import { ACommand } from '@meteo/core';
import { IGmapGeocode, IGmapLocation } from '@meteo/models';

export class SetAdressCmd extends ACommand<IGmapGeocode> {
	constructor(address: string = '') {
		super(
			'[cmd] set address',
			undefined,
			{ address: address },
		);
	}
}
export class SetPlaceIdCmd extends ACommand<IGmapGeocode> {
	constructor(placeId?: string) {
		super(
			'[cmd] set place id',
			undefined,
			{ placeId: placeId },
		);
	}
}
