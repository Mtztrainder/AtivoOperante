package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.db.repository.DenunciaRepository;
import com.example.ativooperante_back.db.repository.OrgaoRepository;
import com.example.ativooperante_back.db.repository.TipoRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("apis/cidadao")
public class CidadaoRestController {
    
    @Autowired
    OrgaoRepository orgaorepo;
    @Autowired
    TipoRepository tiporepo;
    @Autowired
    DenunciaRepository denunciarepo;

    @Autowired
    HttpServletRequest request;
    

    @GetMapping("get-orgaos")
    public ResponseEntity<Object> getOrgaos()
    {
        return ResponseEntity.ok().body(orgaorepo.findAll(Sort.by("nome")));
    }

    @GetMapping("get-orgaos-nome/{nome}")
    public ResponseEntity<Object> getOrgaos(@PathVariable(value = "nome") String nome)
    {
        return ResponseEntity.ok().body(orgaorepo.findAllByNomeLikeIgnoreCaseOrderByNomeAsc('%'+nome+'%'));
    }
    
    @GetMapping("get-tipos")
    public ResponseEntity<Object> getTipos()
    {
        return ResponseEntity.ok().body(tiporepo.findAll(Sort.by("nome")));
    }

    @GetMapping("get-tipos-nome/{nome}")
    public ResponseEntity<Object> getTipos(@PathVariable(value = "nome") String nome)
    {
        return ResponseEntity.ok().body(tiporepo.findAllByNomeLikeIgnoreCaseOrderByNomeAsc('%'+nome+'%'));
    }

    @GetMapping("get-denuncia/{id_usu}")
    public ResponseEntity<Object> getDenuncia(@PathVariable(value = "id_usu") long id_usu)
    {
        Usuario usuario = new Usuario();
        usuario.setId(id_usu);        
        return ResponseEntity.ok().body(denunciarepo.findAllByUsuarioOrderByDtCriacaoDesc(usuario));
    }

    @GetMapping("get-denuncia-titulo/{id_usu}/{titulo}")
    public ResponseEntity<Object> getDenunciaTitulo(@PathVariable(value = "id_usu") long id_usu, @PathVariable(value = "titulo")  String titulo)
    {
        Usuario usuario = new Usuario();
        usuario.setId(id_usu);                
        return ResponseEntity.ok().body(denunciarepo.findAllByUsuarioAndTituloContainingIgnoreCaseOrderByTituloAsc(usuario, titulo));
    }

    @PostMapping("add-denuncia")
    public ResponseEntity<Object> addDenuncia(@RequestBody Denuncia denuncia) {       
        try {
            Denuncia den = denunciarepo.save(denuncia);
            if (den != null)
                return ResponseEntity.ok().body("OK");
            else
                return ResponseEntity.badRequest().body("Erro ao inserir.");
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
