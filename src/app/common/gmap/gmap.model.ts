export interface IGmapApiResponse {
	results: IGmapLocation[];
}

export interface IGmapLocation {
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
	location: IGMapLocation;
}
export interface IGMapLocation {
	lat: number;
	lng: number;
}
