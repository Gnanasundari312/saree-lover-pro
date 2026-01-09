package com.saree.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.saree.backend.model.Saree;

public interface SareeRepository extends JpaRepository<Saree, Long> {}
