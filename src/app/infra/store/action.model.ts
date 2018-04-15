import { Action } from '@ngrx/store';
import { extend } from 'underscore';

export abstract class AAction<T = any> implements Action {
	commandId?: number;
	commandType?: string;
	constructor(
		public type: string,
		public data?: T,
		public paylaod?: any,
	) {}

	follow(previousAction: AAction) {
		this.commandId = previousAction.commandId;
		this.commandType = previousAction.commandType;
		return this;
	}
}
export abstract class AEnricherAction<T = any> extends AAction<T> {
	follow(previousAction: AAction) {
		this.commandId = previousAction.commandId;
		this.commandType = previousAction.commandType;
		// the last source of extend wins, so we make sure that the current paylaod is not overriden
		extend(this.payload, previousAction.payload, this.payload);
		return this;
	}
}