package com.example.ativooperante_back.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ativooperante_back.db.entidades.Denuncia;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    
}
