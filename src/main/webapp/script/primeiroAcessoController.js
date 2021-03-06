app.controller('PrimeiroAcessoController', ['$scope', '$http' , function($scope, $http) {
	window.scope = $scope;
	$scope.screenData = [];
	$scope.formData = {};
	$scope.path = 'primeiroAcesso/';


	$scope.init = function() {
		$scope.screenData = RETORNO;

	}
	
	$scope.atualizarSenha = function() {
		
		if($scope.formData.senha == $scope.formData.senhaAgain){
			var params={
					'senha' : $scope.formData.senha,	
		}
		}else{
			
			senhaAlteradaErro.style.display = "block";
			setTimeout(function(){
				senhaAlteradaErro.style.display = "none";
			},5000);
		}

		$http.post($scope.path + 'atualizarSenha', params).then(
				function(response) {
					if (response.status === 200) {
						
						senhaAlteradaSucesso.style.display = "block";
						setTimeout(function(){
							senhaAlteradaSucesso.style.display = "none";
							window.location.href = "http://localhost:8080/horizon/menu";
						},5000);
					}
				}
		);
	}




}]);