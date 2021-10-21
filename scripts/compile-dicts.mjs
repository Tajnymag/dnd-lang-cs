#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadTSV(inputPath) {
    const inputContent = fs.readFileSync(inputPath, { encoding: 'utf8' });
    const parsedLines = inputContent
        .split('\n')
        .filter(line => !!line)
	.map(line => line.split('\t'));

    return parsedLines;
}

const dictionary = [];
const dndDictionarySrc = loadTSV(path.join(__dirname, '../corpus', 'dnd-to-cs.tsv'));
const lemmaSrc = loadTSV(path.join(__dirname, '../corpus', 'lemmatization-cs.txt'));

for (const entry of dndDictionarySrc) {
    const [dnd, cs] = entry;
    const variants = lemmaSrc.filter(l => l[0] === cs).map(l => l[1]);

    dictionary.push({dnd, cs: [cs, ...variants]});
}

fs.writeFileSync(path.join(__dirname, '..', 'dictionary.json'), JSON.stringify(dictionary));
