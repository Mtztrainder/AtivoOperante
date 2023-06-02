package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.db.repository.UsuarioRepository;
import com.example.ativooperante_back.security.JWTTokenProvider;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping("/security")
public class SecurityRestController {
    
    @Autowired
    private UsuarioRepository usuarioDAO;

    @Autowired
    HttpServletRequest request;
    

    @GetMapping("login")
    public ResponseEntity <Object> logar(String email, String senha)
    {
        String token="";
        Usuario us=null;
        us=usuarioDAO.findByEmail(email);
        
        if(us!=null)
        {   
            if(us.getEmail().equals(email) && us.getSenha().equals(senha))
            {
                token = JWTTokenProvider.getToken(email, us.getNivel(), us.getId(), us.getNome());
                return ResponseEntity.ok(token);
            }
        }
        return ResponseEntity.badRequest().body("Usuario não aceito");
    }  
    
    
    @GetMapping("get-id-usuario")
    public ResponseEntity <Object> getIdUsuario()
    {
        String id = (String)request.getAttribute("id").toString();
        if(id != null && id.length() > 0)
        {   
            return ResponseEntity.ok(id);
        }
        return ResponseEntity.badRequest().body("Usuario não encontrado");
    } 

    @GetMapping("get-nome-usuario")
    public ResponseEntity <Object> getNomeUsuario()
    {
        String nome = (String)request.getAttribute("nome").toString();
        if(nome != null && nome.length() > 0)
        {   
            return ResponseEntity.ok(nome);
        }
        return ResponseEntity.badRequest().body("Usuario não encontrado");
    }

    @GetMapping("get-nivel")
    public ResponseEntity <Object> getNivel()
    {
        String nivel = (String)request.getAttribute("nivel").toString();
        if(nivel != null && nivel.length() > 0)
        {   
            return ResponseEntity.ok(nivel);
        }
        return ResponseEntity.badRequest().body("Usuario não encontrado");
    } 

    @PostMapping("cadastrar-usuario")
    public ResponseEntity <Object> cadastrar(@RequestParam("email") String email, 
                                            @RequestParam("cpf") String cpf,
                                            @RequestParam("nome") String nome,
                                            @RequestParam("senha") String senha)
    {
        Usuario usuario = new Usuario(cpf, nome, email, senha, 1);
        Usuario us=usuarioDAO.findByEmail(email);

        
        if(us==null)
        {   
            try {
                usuarioDAO.save(usuario);
                return ResponseEntity.ok().body("OK");
            } catch (Exception e) {
                // TODO: handle exception
                return ResponseEntity.ok().body(e.getMessage());
            }
            
        }
        return ResponseEntity.badRequest().body("E-mail já cadastrado.");
    }  
}
