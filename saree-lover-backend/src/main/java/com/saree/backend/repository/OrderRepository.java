package com.saree.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.saree.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{}

