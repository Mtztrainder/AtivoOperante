package com.example.ativooperante_back.db.entidades;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="AO_DENUNCIA")
public class Denuncia {
    @Id
    @SequenceGenerator(name = "SEQ_AO_DENUNCIA", allocationSize = 1)
    @Column(name="DEN_ID")
    private Long id;

    @Column(name="DEN_DTCRIACAO")
    private LocalDateTime dtCriacao;
    
    @Column(name="DEN_TITULO")
    private String titulo;

    @Column(name="DEN_TEXTO")
    private String texto;

    @Column(name="DEN_URGENCIA")
    private int urgencia;

    @ManyToOne
    @JoinColumn(name="ORG_ID", nullable=false)  
    private Orgao orgao;

    @ManyToOne
    @JoinColumn(name="TIP_ID", nullable=false)  
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name="USU_ID", nullable=false)  
    private Usuario usuario;

    @OneToOne(mappedBy = "denuncia") //se der erro  optional = true
    private Feedback feedback;

    public Denuncia() {
        this(0L, null, "", "", 0, null, null, null);
    }

    public Denuncia(Long id, LocalDateTime dtCriacao, String titulo, String texto, int urgencia, Orgao orgao,
            Tipo tipo, Usuario usuario) {
        this.id = id;
        this.dtCriacao = dtCriacao;
        this.titulo = titulo;
        this.texto = texto;
        this.urgencia = urgencia;
        this.orgao = orgao;
        this.tipo = tipo;
        this.usuario = usuario;
    }

    

    public Long getId() {
        return id;
    }

    public LocalDateTime getDtCriacao() {
        return dtCriacao;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getTexto() {
        return texto;
    }

    public int getUrgencia() {
        return urgencia;
    }

    public Orgao getOrgao() {
        return orgao;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDtCriacao(LocalDateTime dtCriacao) {
        this.dtCriacao = dtCriacao;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setUrgencia(int urgencia) {
        this.urgencia = urgencia;
    }

    public void setOrgao(Orgao orgao) {
        this.orgao = orgao;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
