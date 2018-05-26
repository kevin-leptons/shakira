const express = require('express');

function init_stream_router(root_dir) {
    return express.static(root_dir);
}

module.exports = init_stream_router;
