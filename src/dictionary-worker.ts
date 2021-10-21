import { expose } from 'comlink';
import { Dictionary } from './dictionary';

export class DictionaryWorker {
	private dictionary: Dictionary;

	constructor() {
		this.dictionary = new Dictionary();
	}

	async isInitialized() {
		return (await this.dictionary.entries.count()) > 0;
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
