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
			// }, function (evt) {
			//     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			//     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
					// });

		},
		convertFile: function(fileId) {

			console.log('FILE ID ANGULAR:', fileId);
			return $http({
				url: '/api/file_upload',
				method: 'GET',
				params: {'file_id': fileId}
			}).then(function(response) {

				console.log('RESPONCE FROM GET ', response);
				return response.data;

			});

		}

	};

}]);
