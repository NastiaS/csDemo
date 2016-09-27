'use strict';

// Use this file for api variables. This file should not be tracked by git.

var document_conversion = {}; // eslint-disable-line camelcase

if (process.env.VCAP_SERVICES) {

	var services = JSON.parse(process.env.VCAP_SERVICES), // eslint-disable-line one-var
		svcName;
	for (svcName in services) { // eslint-disable-line guard-for-in

		console.log('svcName:', svcName, 'services:', services);

		if (svcName.match(/^document_conversion/)) {

			document_conversion = services[svcName][0]['credentials']; // eslint-disable-line camelcase, dot-notation

		}

	}

}


module.exports = {
	PORT: process.env.VCAP_APP_PORT || 1337,
	NYTAPI: 'f47b5dbbdee949f59acc93afdf017e37',
	BLUEMIX_SERVICE_CREDENTIALS: {
		'document_conversion': {
			'username': document_conversion.username,
			'password': document_conversion.password
		}
	}
};
