import { createFeatureSelector } from '@ngrx/store';
import { IGmapGeocode } from '@meteo/models';
export const locationState = createFeatureSelector<IGmapGeocode>('location');
