const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const {Router} = require('express');

const media = require('../media');
const thumb = require('../thumb');

const router = Router();

async function readdir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (e, files) => {
            if (e) {
                reject(e);
                return;
            }
            resolve(files);
        });
    });
}

function sort_file_by_new_date(files) {
    files.sort((a, b) => {
        let aTime = fs.statSync(a.real_path).mtime.getTime();
        let bTime = fs.statSync(b.real_path).mtime.getTime();

        return bTime - aTime;
   });
}

function file_type(file) {
    let stat = fs.statSync(file);

    if (stat.isDirectory()) {
        return 'dir';
    }
    if (media.general(file)) {
        return 'media';
    }
    return 'file';
}

async function get_thumb_file(file) {
    if (!media.video(file)) {
        return null;
    }
    return await thumb.generate(file);
}

async function list_files(root_dir, rel_path) {
    let dir_path = path.join(root_dir, rel_path);
    let names = await readdir(dir_path);
    let files = [];

    for (let name of names) {
        let file_path = path.join(rel_path, name);
        let real_path = path.join(root_dir, file_path);
        files.push({
            name: name,
            path: querystring.escape(file_path),
            type: file_type(real_path),
            real_path: real_path,
            thumb: await get_thumb_file(real_path)
        });
    }

    sort_file_by_new_date(files);
    return files;
}

router.get('/', async (req, res, next) => {
    let cwd = req.query.path ? querystring.unescape(req.query.path) : '.';
    let up_dir = path.dirname(cwd);

    let files = await list_files(req.app_opts.root_dir, cwd);
    res.render('file', {
        files: files,
        up_dir: up_dir,
        cwd: cwd,
    });
});

module.exports = router;
