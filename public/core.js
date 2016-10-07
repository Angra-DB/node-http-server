var nodeServer = angular.module('nodeServer', []);

function mainController($scope, $http) {
    $scope.doc = "";
    $scope.idLookUp = "";
    $scope.idDelete = "";

    $scope.save = function() {
    	var parameter = JSON.stringify({doc: $scope.doc});
	    $http.post('/save',parameter)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

	$scope.lookup = function() {
    	var parameter = JSON.stringify({id: $scope.idLookUp});
	    $http.post('/lookup',parameter)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

	$scope.delete = function() {
    	var parameter = JSON.stringify({id: $scope.idDelete});
	    $http.post('/delete',parameter)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

}