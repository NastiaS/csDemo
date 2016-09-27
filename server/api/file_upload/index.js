'use strict';

var express = require('express'),
	controller = require('./file_upload.controller'),
	router = express.Router(); // eslint-disable-line new-cap


// define route and point an a specific action in this controller
router.post('/', controller.upload_file);
router.get('/', controller.convert_file);
// router.get('/:file_id', controller.download_file);

module.exports = router;

