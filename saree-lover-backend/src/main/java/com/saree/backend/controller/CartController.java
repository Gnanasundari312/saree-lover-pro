package com.saree.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.saree.backend.model.Cart;
import com.saree.backend.repository.CartRepository;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartRepository cartRepo;

    public CartController(CartRepository cartRepo) {
        this.cartRepo = cartRepo;
    }

    // ADD TO CART
    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return cartRepo.save(cart);
    }

    // GET CART BY USER
    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return cartRepo.findByUserId(userId);
    }

    // REMOVE ITEM
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        cartRepo.deleteById(id);
    }
}
