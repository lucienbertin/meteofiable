import { ASuccessableAction } from './action.model';
let currentId = 0;
function generateId() {
	return currentId++;
}
export abstract class ACommand<T = any> extends ASuccessableAction<T> {
	commandId = generateId();
	commandType = this.type;
}
export class DoNothingCommand extends ACommand {
	constructor() { super('[cmd] do nothing'); }
}
