import Dexie from 'dexie';
import { importInto } from 'dexie-export-import';

interface DictionaryEntry {
	dnd: string;
	cs: string[];
}

export class Dictionary extends Dexie {
	entries: Dexie.Table<DictionaryEntry, string>;
	populated: boolean;

	constructor() {
		super('Dictionary');

		this.populated = false;

		this.version(1)
			.stores({
				entries: 'dnd, *cs',
			})
			.upgrade(() => {
				this.populate().catch(console.error);
			});

		this.entries = this.table('entries');
	}

	async populate() {
		const blob = await fetch('/dictionary.blob').then((res) => res.blob());
		await importInto(this, blob, { clearTablesBeforeImport: true });
		this.populated = true;
	}
}
