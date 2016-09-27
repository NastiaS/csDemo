'use strict';

angular.module('Soju')

.controller('ConvertFileController', ['$scope', 'ConvertFileService', function($scope, ConvertFileService) {
		
	$scope.submit = function() {

		if ($scope.form.file.$valid && $scope.file) {

			$scope.upload($scope.file);

		}

	};

	$scope.upload = function(file) {

		console.log('File', file);

		ConvertFileService.fileUpload(file).then(function(fileId) {

			$scope.file_id = fileId;

		});

	};

	$scope.convertFile = function(fileId) {

		console.log('FILE_ID:', fileId);

		ConvertFileService.convertFile(fileId).then(function(data) {

			console.log('MY DATA CONVERTED:', data);
			$scope.docToDownload = data;
			$scope.showLink = true;
			
		});

	};

	$scope.download = function(doc) {

		var url = URL.createObjectURL(new Blob([doc])),
			a = document.createElement('a');
		a.href = url;
		a.download = 'document_name';
		a.target = '_blank';
		a.click();

	};

	$scope.downloadJSON = function(doc) {

		var json = JSON.stringify(doc),
			blob = new Blob([json], {type: 'octet/stream'}),
			url = window.URL.createObjectURL(blob),
			a = document.createElement('a');
		a.href = url;
		a.download = 'json_doc';
		a.click();
		window.URL.revokeObjectURL(url);
		
	};

}]);
