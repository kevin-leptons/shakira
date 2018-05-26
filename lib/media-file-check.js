const path = require('path');


// there extensions can be dupilcated, however Set() will be unique.
const media_exentions_no_dot = [
    // video formats
    'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gif', 'gifv', '.mng',
    'avi', 'mov', 'qt', 'wmv', 'yuv', 'rm', 'rmvb', '.asf', 'amv', 'mp4',
    'm4p', 'm4v', 'mpg', 'mpg2', 'mpeg', 'mpe', 'mpv', 'mpg', 'svi', '3gp',
    '3g2', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b',

    // audio formats
    '3gp', 'aa', 'aac', 'aax', 'act', 'aiff', 'amr', 'ape', 'au', 'awb',
    'dct', 'dss', 'dvf', 'flac', 'gsm', 'iklax', 'ivs', 'm4a', 'm4b', 'm4p',
    'mmf', 'mp3', 'mpc', 'msv', 'ogg', 'oga', 'mogg', 'opus', 'ra', 'rm',
    'raw', 'sln', 'tta', 'vox', 'wav', 'wma', 'wv', 'webm', '8svx'
];
const media_exentions_dot = media_exentions_no_dot.map(ext => `.${ext}`);
const media_exentions = new Set(media_exentions_dot);

module.exports = function(file) {
    let ext = path.extname(file);

    return media_exentions.has(ext);
}
