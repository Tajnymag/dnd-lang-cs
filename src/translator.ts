import { ref } from 'vue';
import { findSpans } from 'unicode-default-word-boundary';
import { Remote, wrap } from 'comlink';

import DictionaryWorker from './dictionary-worker?worker';
import type { DictionaryWorker as DictionaryWorkerType } from './dictionary-worker';

export function useTranslator() {
	const isReady = ref(false);
	const Dictionary = wrap<typeof DictionaryWorkerType>(
		new DictionaryWorker()
	);

	let dictionary: Remote<DictionaryWorkerType> | null = null;

	const translate = async (
		sentence: string,
		direction: { from: 'cs' | 'dnd'; to: 'cs' | 'dnd' }
	): Promise<string> => {
		const dictionary = await waitForDictionary();

		const tokens = [...findSpans(sentence)].map((t) => t.text);
		const processedTokens = [];

		for (const token of tokens) {
			const entry = await dictionary.findOne(
				direction.from === 'cs'
					? { cs: token.toLocaleLowerCase() }
					: { dnd: token }
			);

			if (entry !== undefined) {
				processedTokens.push(
					direction.to === 'cs' ? entry.cs[0] : entry.dnd
				);
			} else {
				processedTokens.push(token);
			}
		}

		return processedTokens.join('');
	};

	const waitForDictionary = async <
		D extends Remote<DictionaryWorkerType>
	>(): Promise<D> => {
		if (dictionary === null) {
			dictionary = await new Dictionary();

			if (!(await dictionary.isInitialized())) {
				await dictionary.populate();
			}
		}

		isReady.value = true;

		return dictionary as D;
	};

	const refresh = async () => {
		isReady.value = false;
		await dictionary?.populate();
		isReady.value = true;
	};

	return {
		isReady,
		dictionary,
		translate,
		refresh,
	};
}
