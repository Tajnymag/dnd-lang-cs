import { expose } from "comlink";
import { Dictionary } from "./dictionary";

export class  DictionaryWorker {
	dictionary: Dictionary;

	constructor() {
		this.dictionary = new Dictionary();
	}

	isStale() {
		return this.dictionary.isStale();
	}

	populate() {
		return this.dictionary.populate();
	}

	get(...args: Parameters<Dictionary['entries']['get']>) {
		return this.dictionary.entries.get(...args);
	}

	findOne(...args: Parameters<Dictionary['entries']['where']>) {
		return this.dictionary.entries.where(...args).first();
	}
}

expose(DictionaryWorker);
