package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Sort;
@CrossOrigin
@RestController
@RequestMapping("apis/admin")
public class AdminRestController {
    @Autowired
    private OrgaoRepository orgaorepo;

    @Autowired
    private TipoRepository tiporepo;

    @Autowired
    private DenunciaRepository denunciarepo;

    @Autowired
    HttpServletRequest request;

    /*CRUD DE ORGAOS */
    @GetMapping("get-orgaos")
    public ResponseEntity<Object> getOrgaos()
    {
        String nivel = (String)request.getAttribute("nivel").toString();
        return ResponseEntity.ok().body(orgaorepo.findAll(Sort.by("nome")));
    }

    @GetMapping("get-orgaos-nome/{nome}")
    public ResponseEntity<Object> getOrgaos(@PathVariable(value = "nome") String nome)
    {
        String nivel = (String)request.getAttribute("nivel").toString();
        return ResponseEntity.ok().body(orgaorepo.findAllByNomeLikeIgnoreCaseOrderByNomeAsc('%'+nome+'%'));
    }

    @PostMapping("save-orgao")
    public ResponseEntity <Object> saveOrgao(@RequestBody Orgao orgao){
        String nivel = (String)request.getAttribute("nivel").toString();

        return ResponseEntity.ok().body(orgaorepo.save(orgao));
    }
    
    @GetMapping("del-orgao/{id}")
    public ResponseEntity <Object> deleteOrgao(@PathVariable(value = "id") long id){
        String nivel = (String)request.getAttribute("nivel").toString();

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
        String nivel = (String)request.getAttribute("nivel").toString();

        return ResponseEntity.ok().body(tiporepo.findAll(Sort.by("nome")));
    }

    @GetMapping("get-tipos-nome/{nome}")
    public ResponseEntity<Object> getTipos(@PathVariable(value = "nome") String nome)
    {
        String nivel = (String)request.getAttribute("nivel").toString();
        return ResponseEntity.ok().body(tiporepo.findAllByNomeLikeIgnoreCaseOrderByNomeAsc('%'+nome+'%'));
    }

    @PostMapping("save-tipo")
    public ResponseEntity <Object> saveTipo(@RequestBody Tipo tipo){
        String nivel = (String)request.getAttribute("nivel").toString();
        return ResponseEntity.ok().body(tiporepo.save(tipo));
    }

    @GetMapping("del-tipo/{id}")
    public ResponseEntity <Object> deleteTipo(@PathVariable(value = "id") long id){
        String nivel = (String)request.getAttribute("nivel").toString();
        try{
            if (!tiporepo.existsById(id))
                return ResponseEntity.badRequest().body("codigo não existe");

                tiporepo.deleteById(id);    
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().body("deletado com sucesso");
    }
    
    @GetMapping("add-feedback/{den_id}/{texto}")
    public ResponseEntity <Object> addFeedback(@PathVariable(value="den_id") Long den_id,
                                                @PathVariable(value="texto") String texto)
    {
        if(request.getAttribute("nivel").toString().equals("0"))
        {
            try{
                denunciarepo.addFeedback(den_id, texto);
                return ResponseEntity.ok().body("inserido com sucesso");
            }catch(Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

        return ResponseEntity.badRequest().body("Acesso não autorizado.");
    }

    @GetMapping("del-denuncia/{id}")
    public ResponseEntity <Object> delDenuncia(@PathVariable(value = "id") long id){
        String nivel = (String)request.getAttribute("nivel").toString();
        try{
            if (!denunciarepo.existsById((long) id))
                return ResponseEntity.badRequest().body("codigo não existe");

                denunciarepo.deleteById((long) id);    
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().body("deletado com sucesso");
    }

    @GetMapping("get-denuncias")
    public ResponseEntity<Object> getDenuncias()
    {
        String nivel = (String)request.getAttribute("nivel").toString();

        return ResponseEntity.ok().body(denunciarepo.findAll(Sort.by("titulo")));
    }

    @GetMapping("get-denuncias-id/{id}")
    public ResponseEntity<Object> getDenunciasId(@PathVariable(value = "id") long id)
    {
        String nivel = (String)request.getAttribute("nivel").toString();

        return ResponseEntity.ok().body(denunciarepo.findById(id));
    }
}
