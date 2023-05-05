package com.example.ativooperante_back.db.entidades;

public class Tipo {
    private Long id;
    private String nome;

    public Tipo() {
        this(0L, "");
    }

    public Tipo(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
    
    
    
}
