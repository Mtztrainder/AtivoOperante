package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="AO_FEEDBACK")
public class Feedback {
    @Id
    @SequenceGenerator(name = "SEQ_AO_FEEDBACK", allocationSize = 1)
    @Column(name="FEE_ID")
    private Long id;

    @Column(name="FEE_TEXTO")
    private String texto;
    
    @OneToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name="DEN_ID", nullable=false)  
    private Denuncia denuncia;

    public Feedback() {
        this(0L, "", null);
    }

    public Feedback(Long id, String texto, Denuncia denuncia) {
        this.id = id;
        this.texto = texto;
        this.denuncia = denuncia;
    }

    public Long getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

}
