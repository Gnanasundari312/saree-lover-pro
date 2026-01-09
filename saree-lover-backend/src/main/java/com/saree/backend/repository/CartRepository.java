package com.saree.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.saree.backend.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
}
