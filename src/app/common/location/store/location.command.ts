import { ACommand } from 'app/core';
import { IGmapGeocode, IGmapLocation } from '../gmap.model';

export class SetAdressCmd extends ACommand<IGmapGeocode> {
	constructor(address: string = '') {
		super(
			'[cmd] set address',
			undefined,
			{ address: address },
		);
	}
}
export class SetLocationCmd extends ACommand<IGmapGeocode> {
	constructor(location?: IGmapLocation) {
		super(
			'[cmd] set location',
			undefined,
			{ location: location },
		);
	}
}
