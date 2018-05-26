#!/usr/bin/env node

const program = require('commander');

const {Application} = require('../lib');

program.version('0.0.0');

program.
    description('Run media server').
    option('-d, --dir <dir>', 'Specific media directory').
    option('-p, --port <port>', 'Sepcific listen port').
    parse(process.argv);

program.dir = program.dir || '.';
program.port = program.port || 6789;

const app = new Application();

let listener = app.root(program.dir).listen(program.port, online_callback);

function online_callback() {
    let addr = listener.address();
    let msg = `${addr.family} http://localhost:${addr.port}`;

    console.log(msg);
}
