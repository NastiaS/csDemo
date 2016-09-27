'use strict';

var Busboy = require('busboy'),
	fs = require('fs'),
	path = require('path'),
	DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1'),
	config = require('../../configuration/environment/development.js'),
	uploadFolder = path.join(__dirname, '../../../uploads/'),
	
	documentConversion = new DocumentConversionV1({
		username: config.BLUEMIX_SERVICE_CREDENTIALS.document_conversion.username,
		password: config.BLUEMIX_SERVICE_CREDENTIALS.document_conversion.password,
		version_date: '2015-12-01'
	});

function getFilePath(filename) {

	if (fs.readdirSync(uploadFolder).indexOf(filename) !== -1) {

		return uploadFolder + filename;

	}

	return null;

}
function getRandomInt(min, max) {

	min = Math.ceil(min); // eslint-disable-line no-param-reassign
	max = Math.floor(max); // eslint-disable-line no-param-reassign
	return Math.floor(Math.random() * (max - min)) + min;

}

exports.upload_file = function(req, res, next) { // eslint-disable-line no-unused-vars

	var busboy = new Busboy({ headers: req.headers }),
		finished = false; // eslint-disable-line no-unused-vars

	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) { // eslint-disable-line no-unused-vars

		var modifiedFilename = getRandomInt(1, 10000) + filename,
			fstream = fs.createWriteStream('uploads/' + modifiedFilename);

		fstream.on('finish', function() {

			res.writeHead(200, { 'Connection': 'close' });
			var json = JSON.stringify({
				'file_id': modifiedFilename
			});
			res.end(json);

		});
		file.pipe(fstream);

	});

	busboy.on('finish', function() {

		finished = true;

	});

	return req.pipe(busboy);

};

exports.convert_file= function(req, res, next) { // eslint-disable-line no-unused-vars, space-infix-ops

	var file = getFilePath(req.query.file_id),
		
		params = {
			conversion_target: 'ANSWER_UNITS',
			file: file ? fs.createReadStream(file) : null
		};

	documentConversion.convert(params, function(err, data) { // eslint-disable-line consistent-return

		if (err) {

			return next(err);

		}
		var type = 'ANSWER_UNITS';
		res.type(type);
		if (req.query.download) {

			res.setHeader('content-disposition', 'attachment; filename=output-' + Date.now() + '.' + type);

		}

		res.send(data);

	});

};
