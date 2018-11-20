import { IGmapGeocode } from '@meteo/models';
import { ACommand } from '@lucca-front-sdk/ng/ngrx';

export class SetAdressCmd extends ACommand<string, IGmapGeocode> {
	static TYPE = '[cmd] set address';
}
export class SetPlaceIdCmd extends ACommand<string, IGmapGeocode> {
	static TYPE = '[cmd] set place id';
}
