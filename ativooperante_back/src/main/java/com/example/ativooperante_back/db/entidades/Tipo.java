package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="AO_TIPO")
public class Tipo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="TIP_ID")
    private Long id;

    @Column(name="TIP_NOME")
    private String nome;

    public Tipo() {
        this(0L, "");
    }

    public Tipo(Long id, String nome) {
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
