const fs = require('fs');
const os = require('os');
const path = require('path');
const shell = require('shelljs');

const video_screen = require('video-screen');
const md5 = require('md5');

const THUMB_DIR = path.join(os.homedir(), 'shakira/thumb');
const THUM_OPTS = {
    time: '00:03:00'
};

shell.mkdir('-p', THUMB_DIR);

function get_thumb_file(video_file) {
     let hash_name = md5(video_file);
     return path.join(THUMB_DIR, hash_name + '.png');
}

function create_thumb(video_file, thumb_file) {
    return new Promise((resolve, reject) => {
        video_screen(video_file, THUM_OPTS, (e, data) => {
            if (e) {
                reject(e);
                return;
            }

            fs.writeFile(thumb_file, data, (e) => {
                if (e) {
                    reject(e);
                    return;
                }
                resolve();
            });
        });
    });
}

 async function generate(video_file) {
    let thumb_file = get_thumb_file(video_file);
    if (fs.existsSync(thumb_file)) {
        return path.basename(thumb_file);
    }

    await create_thumb(video_file, thumb_file);
    return path.basename(thumb_file);
}

module.exports = {
    generate: generate,
    THUMB_DIR: THUMB_DIR
};
