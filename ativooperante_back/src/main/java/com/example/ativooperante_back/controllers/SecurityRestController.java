package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.db.repository.UsuarioRepository;
import com.example.ativooperante_back.security.JWTTokenProvider;

@CrossOrigin
@RestController
@RequestMapping("/security")
public class SecurityRestController {
    
    @Autowired
    private UsuarioRepository usuarioDAO;

    @GetMapping("login")
    public ResponseEntity <Object> logar(String usuario, String senha)
    {
        String token="";
        Usuario us=null;
        us=usuarioDAO.findByEmail(usuario);
        
        if(us!=null)
        {   
            if(us.getEmail().equals(usuario) && us.getSenha().equals(senha))
            {
                token = JWTTokenProvider.getToken(usuario,us.getNivel());
                return ResponseEntity.ok(token);
            }
        }
        return ResponseEntity.badRequest().body("Usuario não aceito");
    }    
}
