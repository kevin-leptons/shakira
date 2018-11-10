const express = require('express');

const {THUMB_DIR} = require('../thumb');

module.exports = express.static(THUMB_DIR);
