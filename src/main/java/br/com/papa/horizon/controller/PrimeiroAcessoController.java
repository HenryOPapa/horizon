package br.com.papa.horizon.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.papa.horizon.dao.UsuarioDao;
import br.com.papa.horizon.entity.Usuario;
import br.com.papa.horizon.vo.DadosPadraoVO;

import com.google.gson.Gson;


@Controller
@RequestMapping("primeiroAcesso")
public class PrimeiroAcessoController {
	
	@RequestMapping
	public ModelAndView primeiroAcesso(HttpSession httpSession) throws Exception {
		Gson gson = new Gson();
		Map<String, Object> retorno = new HashMap<String, Object>();
		DadosPadraoVO dadosPadraoVO = (DadosPadraoVO) httpSession.getAttribute("dadosPadraoVO");
		
		retorno.put("dadosPadraoVO", dadosPadraoVO);
		return new ModelAndView("primeiroAcesso").addObject("result",
				gson.toJson(retorno));
	}
	
	
	@RequestMapping(value = "/atualizarSenha", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> atualizarSenha(@RequestBody Usuario usuarioNovaSenha, HttpSession httpSession) throws Exception { 
		Gson gson = new Gson();
		Map<String, Object> retorno = new HashMap<String, Object>();
		DadosPadraoVO dadosPadraoVO = (DadosPadraoVO) httpSession.getAttribute("dadosPadraoVO");
		Usuario usuario = dadosPadraoVO.getUsuario();
		UsuarioDao dao = new UsuarioDao();
		
		usuario.setSenha(usuarioNovaSenha.getSenha());
		usuario.setPrimeiroAcesso(false);
		dadosPadraoVO.setUsuario(usuario);
		try{
			dao.update(usuario);			
		}catch(Exception e){
			System.out.println("ERRO AO ATUALIZAR SENHA: "+e);
		}
		
		retorno.put("dadosPadraoVO", dadosPadraoVO);

		
		return new ResponseEntity<String>(gson.toJson(retorno), HttpStatus.OK);							
	}
	

}
