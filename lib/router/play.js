const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const {spawn} = require('child_process');
const {Router} = require('express');

const router = Router();
let player = null;
let player_file = null;

router.get('/', function(req, res, next) {
    if (!req.query.path) {
        res.send('Invalid file');
        return;
    }

    let rel_path = querystring.unescape(req.query.path);
    let file_path = path.join(req.app_opts.root_dir, rel_path);

    play_media_file(file_path).
        then(() => res.send({name: path.basename(rel_path)})).
        catch(err => next(err));
});

router.get('/playing', function(req, res, next) {
    let data = {
        name: player_file,
    };
    res.send(data);
});

router.get('/stop', function(req, res, next) {
    kill_player().
        then(() => res.send({})).
        catch(err => next(err));
});

function play_media_file(file_path) {
    return new Promise((resolve, reject) => {
        console.log(`STARTING "${file_path}"`);

        kill_player().
            then(() => {
                return start_player(file_path);
            }).
            then(() => {
                console.log(`PLAYING "${file_path}"`);
                resolve();
            }).
            catch(err => reject(err));
    });
}

function kill_player() {
    return new Promise((resolve, reject) => {
        if (!player)
            resolve();
        player.kill();
        resolve();
    });
}

function start_player(media_file) {
    return new Promise((resolve, reject) => {
        let args = [
            '--qt-start-minimized',
            media_file
        ];

        player = spawn('vlc', args);
        player.on('error', function(err) {
            reject(err);
        });
        setTimeout(function() {
            player_file = path.basename(media_file);
            resolve();
        }, 1);
    });
}

module.exports = router;
