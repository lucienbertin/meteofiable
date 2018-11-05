import { Action } from '@ngrx/store';
import { extend } from 'underscore';
export function followUp(type: string, success: boolean): string {
	const bracketIndex = type.indexOf(']');
	const followupType = `${type.slice(0, bracketIndex)} ${success ? 'v' : 'x'}${type.slice(bracketIndex)}`;
	return followupType;
}
export abstract class AAction<T = any> implements Action {
	correlationId?: number;
	constructor(
		public type: string,
		public data?: T,
		public payload?: any,
	) {}

	follow(previousAction: AAction) {
		this.correlationId = previousAction.correlationId;
		return this;
	}
}
export abstract class AEnricherAction<T = any> extends AAction<T> {
	follow(previousAction: AAction) {
		this.correlationId = previousAction.correlationId;
		// the last source of extend wins, so we make sure that the current paylaod is not overriden
		extend(this.payload, previousAction.payload, this.payload);
		return this;
	}
}
export abstract class ASuccessableAction<T = any> extends AAction<T> {
	onSuccess(data?: T) {
		const fuAction = Object.create(this).follow(this);
		fuAction.type = followUp(this.type, true);
		fuAction.data = data;
		return fuAction;
	}
	onError(error?: any) {
		const fuAction = Object.create(this).follow(this);
		fuAction.type = followUp(this.type, false);
		fuAction.payload = { ...this.payload, error: error };
		return fuAction;
	}
}
