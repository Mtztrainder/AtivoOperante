package com.example.ativooperante_back.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Usuario;

import jakarta.transaction.Transactional;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    public List<Denuncia> findAllByUsuario(Usuario usuario);

    // @Modifying
    // @Transactional
    // @Query(value="INSERT INTO AO_FEEDBACK (FEE_TEXTO, DEN_ID) VALUES (:TEXTO, :DEN_ID)", nativeQuery = true)
    // public void addFeedback(@Param("den_id") Long den_id, @Param("texto") String texto);
}
