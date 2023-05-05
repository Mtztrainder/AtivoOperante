package com.example.ativooperante_back.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ativooperante_back.db.entidades.Usuario;

public interface UsuarioDAO extends JpaRepository<Usuario, Long>{
    
}
