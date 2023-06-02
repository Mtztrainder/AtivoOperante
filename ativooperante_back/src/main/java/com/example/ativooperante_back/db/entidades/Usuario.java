package com.example.ativooperante_back.db.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="AO_USUARIO")
public class Usuario {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "SEQ_USUARIO")
    @SequenceGenerator(name ="SEQ_USUARIO", sequenceName = "SEQ_AO_USUARIO", allocationSize = 1)
    @Column(name="USU_ID")
    private Long id;

    @Column(name="USU_CPF")
    private String cpf;

    @Column(name="USU_NOME")
    private String nome;
    
    @Column(name="USU_EMAIL")
    private String email;

    @Column(name="USU_SENHA")
    private String senha;

    @Column(name="USU_NIVEL")
    private int nivel;

    public Usuario() {
        this(0L, "", "", "", "", 0);
    }

    public Usuario(String cpf, String nome, String email, String senha, int nivel) {
        this(0L, cpf, nome, email, senha, nivel);
    }

    public Usuario(Long id, String cpf, String nome, String email, String senha, int nivel) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.nivel = nivel;
    }

    public Long getId() {
        return id;
    }
    
    public String getCpf() {
        return cpf;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public int getNivel() {
        return nivel;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCPF(String cpf) {
        this.cpf = cpf;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setNivel(int nivel) {
        this.nivel = nivel;
    }
}
