#!/usr/bin/env node

async function read(stream) {
   const chunks = [];
   for await (const chunk of stream) chunks.push(chunk); 
   return Buffer.concat(chunks).toString('utf8');
}

const input = await read(process.stdin);
const lines = input.split('\n').filter(line => !!line);

lines.sort((a, b) => {
    const [firstColA, secondColA] = a.split('\t');
    const [firstColB, secondColB] = b.split('\t');
    return firstColA.localeCompare(firstColB, 'cs-CZ');
});

lines.forEach(line => console.log(line));

