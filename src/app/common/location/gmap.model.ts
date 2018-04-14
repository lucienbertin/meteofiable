export interface IGmapApiResponse {
	results: IGmapGeocode[];
}

export interface IGmapGeocode {
	address_components: IGmapAdressComponent[];
	formatted_address: string;
	geometry: IGmapGeometry;
	place_id: string;
	types: string[];
}
export interface IGmapAdressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}
export interface IGmapGeometry {
	location: IGmapLocation;
}
export interface IGmapLocation {
	lat: number;
	lng: number;
}
