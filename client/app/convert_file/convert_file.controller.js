'use strict';

angular.module('Soju')

.controller('ConvertFileController', ['$scope', 'ConvertFileService', function($scope, ConvertFileService) {

	$scope.selectedOutputType = '';
   
	$scope.imageStatus = '';

	$scope.convertFile = function() {

		$scope.imageStatus = 'Sent';

		if ($scope.form.file.$valid && $scope.file) {

			ConvertFileService.fileUpload($scope.file).then(function(fileId) {

				$scope.file_id = fileId;

				ConvertFileService.convertFile(fileId, $scope.selectedOutputType).then(function(data) {

					console.log('MY DATA CONVERTED:', data);
					$scope.docToDownload = data;
					$scope.imageStatus = 'Received';
					$scope.showLink = true;
			
				});

			});

		}

	};
	$scope.download = function(doc) {

		if ($scope.selectedOutputType === 'JSON') {

			var json = JSON.stringify(doc),
				blob = new Blob([json], {type: 'octet/stream'}),
				urlJSON = window.URL.createObjectURL(blob),
				aJSON = document.createElement('a');
			aJSON.href = urlJSON;
			aJSON.download = 'json_doc';
			aJSON.click();
			window.URL.revokeObjectURL(urlJSON);

		} else {

			var url = URL.createObjectURL(new Blob([doc])), // eslint-disable-line one-var
				a = document.createElement('a');
			a.href = url;
			a.download = 'plain_text_doc';
			a.target = '_blank';
			a.click();

		}

	};

}]);
