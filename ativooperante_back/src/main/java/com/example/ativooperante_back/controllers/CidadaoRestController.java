package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.db.repository.DenunciaRepository;
import com.example.ativooperante_back.db.repository.OrgaoRepository;
import com.example.ativooperante_back.db.repository.TipoRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("apis/cidadao")
public class CidadaoRestController {
    
    @Autowired
    OrgaoRepository orgaorepo;
    @Autowired
    TipoRepository tiporepo;
    @Autowired
    DenunciaRepository denunciarepo;

    @GetMapping("get-orgaos")
    public ResponseEntity<Object> getOrgaos()
    {
        return ResponseEntity.ok().body(orgaorepo.findAll(Sort.by("nome")));
    }
    
    @GetMapping("get-tipos")
    public ResponseEntity<Object> getTipos()
    {
        return ResponseEntity.ok().body(tiporepo.findAll(Sort.by("nome")));
    }

    @GetMapping("get-denuncia/{id_usu}")
    public ResponseEntity<Object> getDenuncia(@PathVariable(value = "id_usu") long id_usu)
    {
        Usuario usuario = new Usuario();
        usuario.setId(id_usu);        
        return ResponseEntity.ok().body(denunciarepo.findAllByUsuario(usuario));
    }

    @PostMapping("add-denuncia")
    public ResponseEntity<Object> addDenuncia(@RequestBody Denuncia denuncia) {
                
        return ResponseEntity.ok().body(denunciarepo.save(denuncia));
    }
    
}
