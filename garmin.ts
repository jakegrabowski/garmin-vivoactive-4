import * as fs from 'fs';

const germanFile = './original/german.ln4';
const polishSrcFile = './src/polish.ln4';
const outputFile = 'out.ln4';

function readFileLines(filePath: string, skipHeader: boolean = false): string[] {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim()).filter(line => line.length > 0);
    return skipHeader ? lines.slice(1) : lines;
}

const germanLines = readFileLines(germanFile, true);
const polishLines = readFileLines(polishSrcFile, true);

const germanKeys = new Set(germanLines.map(line => line.substring(0, 8)));
const polishKeys = new Set(polishLines.map(line => line.substring(0, 8)));

const germanExcess = germanLines.filter(line => !polishKeys.has(line.substring(0, 8)));
const polishExcess = new Set(polishLines.filter(line => !germanKeys.has(line.substring(0, 8))));

const srcCleared = polishLines.filter(line => !polishExcess.has(line));

fs.writeFileSync(outputFile, srcCleared.join('\n'));
