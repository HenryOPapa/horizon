package br.com.papa.horizon.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import br.com.papa.horizon.dao.UsuarioDao;
import br.com.papa.horizon.entity.Usuario;
import br.com.papa.horizon.vo.DadosPadraoVO;

import com.google.gson.Gson;

/**
 * 
 * @author henry.papa
 *
 */


@Controller
@RequestMapping("menu")
public class MenuController {
	
	@RequestMapping
	public ModelAndView menu(HttpSession httpSession) throws Exception {
		Gson gson = new Gson();
		Map<String, Object> retorno = new HashMap<String, Object>();
		DadosPadraoVO dadosPadraoVO = (DadosPadraoVO) httpSession.getAttribute("dadosPadraoVO");
		
		retorno.put("dadosPadraoVO", dadosPadraoVO);
		return new ModelAndView("menu").addObject("result",
				gson.toJson(retorno));
	}

	/*
	 * 
	 * Método responsavel por deslogar o usuario
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> logout(HttpSession httpSession) throws Exception { 

		Gson gson = new Gson();
		httpSession.removeAttribute("dadosPadraoVO");
		
		return new ResponseEntity<String>(gson.toJson("{}"), HttpStatus.OK);							
	}
	
	
	
	
	
	@RequestMapping(value = "/senha", method = RequestMethod.POST, produces = "application/json")
	public ModelAndView alterarSenha(@RequestParam String senha, HttpSession httpSession) throws Exception {
		Gson gson = new Gson();
		Map<String, Object> retorno = new HashMap<String, Object>();
		DadosPadraoVO dadosPadraoVO = (DadosPadraoVO) httpSession.getAttribute("dadosPadraoVO");
		Usuario usuario = dadosPadraoVO.getUsuario();
		UsuarioDao dao = new UsuarioDao();
		
		usuario.setSenha(senha);
		try{
			dao.update(usuario);			
		}catch(Exception e){
			System.out.println("ERRO AO ATUALIZAR SENHA: "+e);
		}
		
		retorno.put("dadosPadraoVO", dadosPadraoVO);
		return new ModelAndView("alterarSenha").addObject("result",
				gson.toJson(retorno));
	}
	

}
