const path = require('path');

// there extensions can be dupilcated, however Set() will be unique.
const video_no_dot_exts = [
    'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gif', 'gifv', '.mng',
    'avi', 'mov', 'qt', 'wmv', 'yuv', 'rm', 'rmvb', '.asf', 'amv', 'mp4',
    'm4p', 'm4v', 'mpg', 'mpg2', 'mpeg', 'mpe', 'mpv', 'mpg', 'svi', '3gp',
    '3g2', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b'
];
const audio_no_dot_exts = [
    '3gp', 'aa', 'aac', 'aax', 'act', 'aiff', 'amr', 'ape', 'au', 'awb',
    'dct', 'dss', 'dvf', 'flac', 'gsm', 'iklax', 'ivs', 'm4a', 'm4b', 'm4p',
    'mmf', 'mp3', 'mpc', 'msv', 'ogg', 'oga', 'mogg', 'opus', 'ra', 'rm',
    'raw', 'sln', 'tta', 'vox', 'wav', 'wma', 'wv', 'webm', '8svx'
];
const video_dot_exts = video_no_dot_exts.map(ext => '.' + ext);
const audio_dot_exts = audio_no_dot_exts.map(ext => '.' + ext);
const general_dot_exts = [...video_dot_exts, ...audio_dot_exts];
const video_exts = new Set(video_dot_exts);
const audio_exts = new Set(audio_dot_exts);
const general_exts = new Set(general_dot_exts);

function audio(file) {
    let ext = path.extname(file);
    return audio_exts.has(ext);
}

function video(file) {
    let ext = path.extname(file);
    return video_exts.has(ext);
}

function general(file) {
    let ext = path.extname(file);
    return general_exts.has(ext);
}

module.exports = {
    audio: audio,
    video: video,
    general: general
};
