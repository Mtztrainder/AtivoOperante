package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="AO_FEEDBACK")
public class Feedback {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)//GenerationType.SEQUENCE, generator = "SEQ_AO_FEEDBACK")
    @Column(name="FEE_ID")
    private Long id;

    @Column(name="FEE_TEXTO")
    private String texto;
    
    @OneToOne
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

    public Denuncia getDenuncia() {
        return denuncia;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setDenuncia(Denuncia denuncia) {
        this.denuncia = denuncia;
    }
}
