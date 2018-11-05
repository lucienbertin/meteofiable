// https://stackoverflow.com/a/19303725/1630183
export class Randomizer {
	private seed: number;
	constructor(seedKey: string) {
		this.seed = toSeed(seedKey);
	}
	next() {
		const x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}
}
function toSeed(key: string): number {
	return key.split('').reduce((sum, a) => sum + a.charCodeAt(0), 0);
}
