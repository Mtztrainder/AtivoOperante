package com.example.ativooperante_back.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Usuario;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    public List<Denuncia> findAllByUsuario(Usuario usuario);

}
