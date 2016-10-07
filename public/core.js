// public/core.js
var scotchTodo = angular.module('nodeServer', []);

function mainController($scope, $http) {
    $scope.doc = "";
    $scope.id = "";

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
    	var parameter = JSON.stringify({id: $scope.id});
    	console.log(parameter);
	    $http.post('/lookup',parameter)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

}