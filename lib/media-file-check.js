const path = require('path');

const media_exentions = new Set([
    '.flac',
    '.mp3',
    '.mp4',
]);

module.exports = function(file) {
    let ext = path.extname(file);

    return media_exentions.has(ext);
}
