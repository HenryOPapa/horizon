app.controller('ManutencaoOrcamentoController', ['$scope', '$http', function($scope, $http) {
	window.scope = $scope;
	$scope.screenData = [];
	$scope.formData = {};
	$scope.path = 'manutencaoOrcamento/';
	$scope.showListOrcamento = true;
	$scope.showDetalheOrcamento = false;
	$scope.showListPecaServico = false;
	$scope.screenData.itensDeServico = [];	
	$scope.valorFinal = 0;

	$scope.init = function() {
		$scope.screenData = RETORNO;

	}
	
	$scope.calcula = function(row){
		row.valorFinal = Number (row.valor * row.quantidade);
		atualizaLista();
	}
	
	function atualizaLista(){
		$scope.valorFinal = 0;
		for(var i=0; i < $scope.screenData.itensDeServico.length; i++){
			$scope.valorFinal += Number($scope.screenData.itensDeServico[i].valorFinal);
		}
	}
	
	

	$scope.detalharOrcamento = function(row) {
		var params = {
				'id_orcamento': row.id_orcamento,
				'relato' : row.relato,
				'observacao' : row.observacao,
				'idCliente' : row.idCliente,
				'idEquipamento' : row.idEquipamento,
				'idEspecialidade' : row.idEspecialidade,
		}

		$http.post($scope.path + 'detalharOrcamento', params).then(
				function(response) {
					if (response.status == 200) {
						$scope.formData.orcamento = response.data.orcamento,
						$scope.screenData.pecas = response.data.pecas,
						$scope.screenData.servicos = response.data.servicos,
						$scope.screenData.cliente = response.data.cliente,
						$scope.screenData.equipamento = response.data.equipamento,
						$scope.screenData.especialidade = response.data.especialidade,
						$scope.screenData.itensDeServico = response.data.itensDeServico,
						$scope.showListOrcamento = false;
						$scope.showDetalheOrcamento = true;

					}else{
						erroDetalharOrcamento.style.display = "block";
						setTimeout(function(){
							erroDetalharOrcamento.style.display = "none";
						},5000);

					}
				}
		);
	}

	
	$scope.adicionarItem = function(idx) {
		var itemDeServico = {};
		if(idx == 1){
			itemDeServico = $.parseJSON($scope.formData.peca);
			delete itemDeServico.idPeca;
			delete itemDeServico.quantidadeMinima;
			itemDeServico.idItemOrcamento = itemDeServico.idPeca;			
		}else if(idx == 2){
			itemDeServico = $.parseJSON($scope.formData.servico);
			itemDeServico.idItemOrcamento = itemDeServico.id_servico;
		}
		$scope.screenData.itensDeServico.push(itemDeServico);							
		$scope.showListPecaServico = true;
		atualizaLista();

	}
	
	$scope.salvarAlteracoesOrcamento = function() {
		var params = {
				'pontos' : $scope.formData.ponto,
				'observacao' :$scope.screenData.orcamento.observacao,
				'id_orcamento' : $scope.screenData.orcamento.id_orcamento,
				'valorTotal' : $scope.valorFinal
		}

		$http.post($scope.path + 'salvarAlteracoesOrcamento',params).then(
				function(response) {
					if (response.status == 200) {
						sucessoSalvarAlteracoes.style.display = "block";
						setTimeout(function(){
							sucessoSalvarAlteracoes.style.display = "none";
						},5000);					
						
					}else{
						erroSalvarAlteracoes.style.display = "block";
						setTimeout(function(){
							erroSalvarAlteracoes.style.display = "none";
						},5000);
					}

				}

		);
	}
	
	$scope.finalizar = function() {
		var params = {};
		params.itensOrcamento = $scope.screenData.itensDeServico;
		params.orcamento = $scope.formData.orcamento;

		$http.post($scope.path + 'finalizar', params).then(
				function(response) {
					if (response.status == 200) {
						
						sucessoAtualizaOrcamento.style.display = "block";
						setTimeout(function(){
							sucessoAtualizaOrcamento.style.display = "none";
						},5000);
						location.reload();
						
					}else{
						erroAtualizaOrcamento.style.display = "block";
						setTimeout(function(){
							erroAtualizaOrcamento.style.display = "none";
						},5000);
					}	

				}

		);
	}
	
	
	
	$scope.limparLista = function (){
		$scope.screenData.itensDeServico = undefined;
		atualizaLista();
	}
	
	$scope.deletarItemLista = function (index) {
		$scope.screenData.itensDeServico.splice(index, 1);
		atualizaLista();
		
	}





}]);