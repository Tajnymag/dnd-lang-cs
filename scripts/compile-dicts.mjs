#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { uniq } from 'lodash-es';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadTSV(inputPath) {
	const inputContent = fs.readFileSync(inputPath, { encoding: 'utf8' });
	const parsedLines = inputContent
		.split('\n')
		.filter((line) => !!line)
		.map((line) => line.split('\t'));

	return parsedLines;
}

const dictionary = [];
const dndDictionarySrc = loadTSV(
	path.join(__dirname, '../corpus', 'dnd-to-cs.tsv')
);

for (const entry of dndDictionarySrc) {
	const [dnd, cs] = entry;
	const variants = execFileSync(
		'majka',
		['-l', '-f', path.join(__dirname, '../corpus', 'majka.l-wt')],
		{ input: cs, encoding: 'utf8' }
	)
		.trim()
		.split('\n')
		.map((l) => l.split(':')[0]);

	dictionary.push({ dnd, cs: uniq([cs, ...variants]) });
}

fs.writeFileSync(
	path.join(__dirname, '../public', 'dictionary.json'),
	JSON.stringify(dictionary)
);
