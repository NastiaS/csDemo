'use strict';

angular.module('Soju')

.factory('ConvertFileService', ['$http', 'Upload', function($http, Upload) {

	return {
		getNews: function() {

			return $http.get('/api/feed').then(function(res) {
				
				return res.data;
				
			});

		},
		fileUpload: function(file) {

			return Upload.upload({
				url: '/api/file_upload',
				file: file
			}).then(function(resp) {

				console.log('HERE IS MY DATA:', resp.data.file_id);
				return resp.data.file_id;

			}, function(resp) {

				console.log('Error status: ' + resp.status);
			
			});

		},
		convertFile: function(fileId, outputType) {

			function mapOutputType() {

				switch (outputType) {
				case 'JSON':
					return 'ANSWER_UNITS';
				case 'Plain Text':
					return 'NORMALIZED_TEXT';
				default:
					return 'NORMALIZED_TEXT';
				}

			}

			return $http({
				url: '/api/file_upload',
				method: 'GET',
				params: {'file_id': fileId, 'outputType': mapOutputType()}
			}).then(function(response) {

				console.log('RESPONCE FROM GET ', response);
				return response.data;

			});

		}

	};

}]);
