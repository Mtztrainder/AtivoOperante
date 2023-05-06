package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="AO_ORGAO")
public class Orgao {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)//GenerationType.SEQUENCE, generator = "SEQ_AO_ORGAO")
    @Column(name="ORG_ID")
    private Long id;

    @Column(name="ORG_NOME")
    private String nome;

    public Orgao() {
        this(0L, "");
    }

    public Orgao(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
