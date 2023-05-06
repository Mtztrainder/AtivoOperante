package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.repository.OrgaoRepository;

@RestController
@RequestMapping("apis")
public class TesteRestController {
    @Autowired
    OrgaoRepository repoOrgao;

    @GetMapping("orgaos")
    ResponseEntity<Object> findOrgaos(){
        return ResponseEntity.ok(repoOrgao.findAll());
    }
}
