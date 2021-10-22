import Dexie from 'dexie';

interface DictionaryEntry {
	dnd: string;
	cs: string[];
}

export class Dictionary extends Dexie {
	entries: Dexie.Table<DictionaryEntry, string>;

	constructor() {
		super('Dictionary');

		this.version(1).stores({
			entries: 'dnd, *cs',
		});

		this.entries = this.table('entries');
	}

	async populate() {
		const dictionary = await fetch('/dictionary.json').then((res) =>
			res.json()
		);
		await this.entries.clear();
		await this.entries.bulkPut(dictionary);
	}
}
