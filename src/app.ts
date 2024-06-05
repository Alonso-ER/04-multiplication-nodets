import { yarg } from './config/plugins/yargs.plugin'
import { ServerApp } from './presentation/server-app';

// console.log(process.argv);
// console.log(yarg.b);
// ejemplo
// node dist/app.js --base 10 -l=100 --file=hola.txt -s

(async() => {
    await main();

})();

async function main() {

    const { 
        b: base, 
        l: limit, 
        s: showTable,
        n: fileName,
        d: fileDestination,
    } = yarg

    ServerApp.run({ base, limit, showTable, fileName, fileDestination });

}
