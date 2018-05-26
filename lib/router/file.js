const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const {Router} = require('express');

const media_file_check = require('../media-file-check');

const router = Router();

router.get('/', function(req, res, next) {
    let cwd = req.query.path ? querystring.unescape(req.query.path) : '';
    let up_dir = path.dirname(cwd);

    list_files(req.app_opts.root_dir, cwd).
        then((files) => {
            res.render('file', {
                files: files,
                up_dir: up_dir,
                cwd: cwd,
            });
        }).
        catch(err => next(err));
});

function list_files(root_dir, rel_path) {
    let dir_path = path.join(root_dir, rel_path);

    return new Promise((resolve, reject) => {
        fs.readdir(dir_path, (err, file_names) => {
            if (err) {
                reject(err);
                return;
            }

            let files = [];

            file_names.forEach(file_name => {
                let file_path = path.join(rel_path, file_name);
                let real_path = path.join(root_dir, file_path);

                files.push({
                    name: file_name,
                    path: querystring.escape(file_path),
                    type: file_type(real_path)
                });
            });
            resolve(files);
        });
    });
}

function file_type(file) {
    let stat = fs.statSync(file);

    if (stat.isDirectory())
        return 'dir';
    if (media_file_check(file))
        return 'media';
    return 'file';
}

module.exports = router;
