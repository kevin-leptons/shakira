#!/usr/bin/env node

const program = require('commander');

const {Application} = require('../lib');

program.version('1.0.1');

program.
    command('serve <media_dir>').
    description('Run media server').
    option('-p, --port <port>', 'Sepcific listen port').
    action(cli_serve);

program.parse(process.argv);

function cli_serve(media_dir, opts) {
    opts.port = opts.port || 6789;

    const app = new Application();

    let listener = app.
        root(media_dir).
        listen(opts.port, () => {
            let addr = listener.address();
            let msg = `${addr.family} http://localhost:${addr.port}`;

            console.log(msg);
        });
}
