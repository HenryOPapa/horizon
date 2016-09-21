
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>


<%@ include file="../cabecalho.jsp"%>
<body>
	<div class="container" ng-controller="ManutencaoOrcamentoController"
		ng-init="init()">

		<!-- INICIO PAINEL DE ORCAMENTOS -->
		<div ng-show="showListOrcamento">
			<div class="input-group">
				<div class="input-group-addon">
					<i class="glyphicon glyphicon-search"></i>
				</div>
				<input type="text" class="form-control" ng-model="valorFiltro"
					placeholder="Procurar" id="pesquisa">
			</div>


			<div class="panel panel-default">
				<div class="panel-heading accordion-heading accordion-heading-sm">
					Orcamentos</div>

				<div class="panel-body scrollable">

					<table class="table">
						<thead>
							<tr>
								<th>C�digo</th>
								<th>Relato</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr class="clickable"
								ng-repeat="row in screenData.orcamentos | filter:valorFiltro"
								ng-click="detalharOrcamento(row)">
								<td scope="row">{{row.id_orcamento}}</td>
								<td>{{row.relato}}</td>
								<td>{{row.statusOrcamento}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- FIM PAINEL DE ORCAMENTOS -->
		<div id="erroDetalharOrcamento"
			class="col-sm-12 form-group text-left alert alert-danger" ng-cloak>
			Oops, ocorreu algum erro</div>

		<!-- INICIO FORMULARIO DETALHE ORCAMENTO -->
		<div ng-show="showDetalheOrcamento">
			<div class="panel panel-default">
				<div class="panel-heading accordion-heading accordion-heading-sm">
					Detalhes Or�amento</div>
				<div class="panel-body">

					<div class="col-sm-6 form-group">
						<label>Cliente</label> <input type="text" class="form-control"
							name="nome" value="{{screenData.cliente.nome}}" disabled>
					</div>

					<div class="col-sm-6 form-group">
						<label>CPF</label> <input type="text" class="form-control"
							name="cpf" value="{{screenData.cliente.cpf}}" disabled>
					</div>

					<div class="col-sm-6 form-group">
						<label>N�mero S�rie Equipamento</label> <input type="text"
							class="form-control" name="equipamento"
							value="{{screenData.equipamento.numeroSerie}}" disabled>
					</div>

					<div class="col-sm-6 form-group">
						<label>Especialidade</label> <input type="text"
							class="form-control" name="especialidade"
							value="{{screenData.especialidade.descricao}}" disabled>
					</div>

					<div class="col-sm-6 form-group">
						<label>Relato</label>
						<textarea rows="6" class="form-control" name="relato"
							ng-model="screenData.orcamento.relato" disabled></textarea>
					</div>

					<div class="col-sm-6 form-group">
						<label>Observa��es</label>
						<textarea rows="6" placeholder="OBSERVA��ES" class="form-control"
							name="observacao" ng-model="screenData.orcamento.observacao"></textarea>
					</div>



					<!-- Adicionar Pecas -->
					<div class="col-sm-4 form-group input">
						<select class="form-control" ng-model="formData.peca">
							<option value="">Nova pe�a de manuten��o</option>
							<option ng-repeat="item in screenData.pecas"
								value="{{item.idPeca}}">{{item.descricao}}</option>
						</select>
					</div>

					<div class="col-sm-1 form-grou" ng-cloak>
						<input type="button" class="btn btn-default bt"
							ng-click="adicionarPeca()" value="Adicionar">
					</div>

					<div class="col-sm-1 form-grou" ng-cloak>
						<input type="button" class="btn btn-danger bt"
							ng-click="limparLista()" value="Limpar">
					</div>
					<!-- FIM Adicionar Pecas -->


					<!-- LISTA PECAS E SERVICOS -->
					<div ng-show="showListPecaServico">


						<div class="panel-body">

							<table class="table">
								<tbody>
									<tr class="clickable"
										ng-repeat="row in screenData.listPecasUtilizadas">
										<td scope="row">{{row.descricao}}</td>
										<td><input type="number" ng-model="row.quantidade" ng-change="calcula(row)" placeholder="Quantidade"></td>
										<td>R$ {{row.valor * row.quantidade}}</td>
										<td class="text-center"><span
											class="glyphicon glyphicon-trash text-danger clickable"
											ng-click="deletarItemLista($index)"></span></td>
									</tr>

								</tbody>
							</table>
									<div class="col-sm-10 text-right">Total: R$ {{valorFinal}}
									<span ng-model="formData.valorTotal">Total: R$ {{valorFinal}}</span>
									</div>
						</div>
					</div>
					<!--FIM LISTA PECAS E SERVICOS -->




				</div>
			</div>



		</div>
		<!-- FIM FORMULARIO DETALHE ORCAMENTO -->


	</div>


	<%@ include file="../rodape.jsp"%>