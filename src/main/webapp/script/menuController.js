app.controller('MenuController', ['$scope', '$http' , function($scope, $http) {
	window.scope = $scope;
	$scope.screenData = [];
	$scope.formData = {};
	$scope.path = 'menu/';


	$scope.init = function() {
		$scope.screenData = RETORNO;

	}



}]);