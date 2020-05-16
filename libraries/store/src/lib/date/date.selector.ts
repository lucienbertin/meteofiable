import { createFeatureSelector } from '@ngrx/store';
import { Moment } from 'moment';
export const dateState = createFeatureSelector<Moment>('date');
