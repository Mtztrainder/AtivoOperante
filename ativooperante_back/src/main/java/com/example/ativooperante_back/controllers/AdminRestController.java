package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Orgao;
import com.example.ativooperante_back.db.entidades.Tipo;
import com.example.ativooperante_back.db.repository.DenunciaRepository;
import com.example.ativooperante_back.db.repository.OrgaoRepository;
import com.example.ativooperante_back.db.repository.TipoRepository;

import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("apis/admin")
public class AdminRestController {
    @Autowired
    private OrgaoRepository orgaorepo;

    @Autowired
    private TipoRepository tiporepo;

    @Autowired
    private DenunciaRepository denunciarepo;

    /*CRUD DE ORGAOS */
    @GetMapping("get-orgaos")
    public ResponseEntity<Object> getOrgaos()
    {
        return ResponseEntity.ok().body(orgaorepo.findAll(Sort.by("nome")));
    }

    @PostMapping("save-orgao")
    public ResponseEntity <Object> saveOrgao(@RequestBody Orgao orgao){
        return ResponseEntity.ok().body(orgaorepo.save(orgao));
    }
    
    @GetMapping("del-orgao/{id}")
    public ResponseEntity <Object> deleteOrgao(@PathVariable(value = "id") long id){
        try{
            if (!orgaorepo.existsById(id))
                return ResponseEntity.badRequest().body("codigo não existe");

            orgaorepo.deleteById(id);    
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().body("deletado com sucesso");
    }

    /*CRUD DE TIPOS */
    @GetMapping("get-tipos")
    public ResponseEntity<Object> getTipos()
    {
        return ResponseEntity.ok().body(tiporepo.findAll(Sort.by("nome")));
    }

    @PostMapping("save-tipo")
    public ResponseEntity <Object> saveTipo(@RequestBody Tipo tipo){
        return ResponseEntity.ok().body(tiporepo.save(tipo));
    }

    @GetMapping("del-tipo/{id}")
    public ResponseEntity <Object> deleteTipo(@PathVariable(value = "id") long id){
        try{
            if (!tiporepo.existsById(id))
                return ResponseEntity.badRequest().body("codigo não existe");

                tiporepo.deleteById(id);    
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().body("deletado com sucesso");
    }
    @PostMapping("add-feedback/{den_id}/{texto}")
    public ResponseEntity <Object> addFeedback(@PathVariable(value="den_id") Long den_id,
                                                @PathVariable(value="texto") String texto)
    {
        try{
            denunciarepo.addFeedback(den_id, texto);
            return ResponseEntity.ok().body("inserido com sucesso");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("del-denuncia/{id}")
    public ResponseEntity <Object> delDenuncia(@PathVariable(value = "id") long id){
        try{
            if (!denunciarepo.existsById((long) id))
                return ResponseEntity.badRequest().body("codigo não existe");

                denunciarepo.deleteById((long) id);    
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().body("deletado com sucesso");
    }
}
