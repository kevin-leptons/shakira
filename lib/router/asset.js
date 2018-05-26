const path = require('path');
const express = require('express');

const asset_dir = path.join(path.dirname(__dirname), 'asset');

module.exports = express.static(asset_dir);
