package com.Spring.ecom_proj.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Spring.ecom_proj.model.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {
}