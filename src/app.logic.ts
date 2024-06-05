import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b:base, l:limit, s:showTable } = yarg
let outputMessage = '';

const hearderMessage = `
=============================
        Tabla del ${base}
============================= \n
`;


outputMessage = hearderMessage + outputMessage;

if(showTable) console.log(outputMessage);

const outputPath = `outputs`;

fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log(`File created with base ${base}`);
