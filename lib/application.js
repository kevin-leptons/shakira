const express = require("express");
const fs = require('fs');
const path = require('path');

const router = require('./router');

function Application() {
    this._opts = {};
}

const proto = Application.prototype;

proto.root = function(root_dir) {
    this._check_root_dir(root_dir);

    this._opts.root_dir = root_dir;

    return this;
}

proto.listen = function(port, callback) {
    const app = express();

    app.set('views', path.join(__dirname, 'view'));
    app.set('view engine', 'pug');

    app.use(init_config_middleware(this._opts));
    app.use('/', router.root);
    app.use('/asset', router.asset);

    app.use('/file', router.file);
    app.use('/stream', router.stream(this._opts.root_dir));
    app.use('/play', router.play);

    return app.listen(port, callback);
}

proto._check_root_dir = function(root_dir) {
    if (!fs.existsSync(root_dir))
        throw Error(`"${root_dir}" does not exist`);

    let stat = fs.statSync(root_dir);

    if (!stat.isDirectory())
        throw Error(`"${root_dir}" is not directory`);
}

function init_config_middleware(opts) {
    return function config_middleware(req, res, next) {
        req.app_opts = opts;
        next();
    }
}

module.exports = Application;
