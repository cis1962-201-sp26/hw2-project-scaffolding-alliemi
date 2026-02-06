#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { validatePizza } from './validatePizza';

const args = parseArgs({ allowPositionals: true });
const file = args.positionals[0];

if (!file) {
    console.error('Usage: pizza-validator <file.json>');
    process.exit(1);
}

let data;
try {
    data = JSON.parse(readFileSync(file, 'utf8'));
} catch {
    console.error('Could not read file');
    process.exit(1);
}

const result = validatePizza(data);

if (result.isPizza) {
    console.log('Valid pizza');
} else {
    console.log('Not a pizza');
    for (const err of result.errors) {
        console.log('-', err);
    }
    process.exit(1);
}
