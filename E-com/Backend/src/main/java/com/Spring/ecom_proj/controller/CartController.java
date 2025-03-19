package com.Spring.ecom_proj.controller;

import com.Spring.ecom_proj.model.CartItemRequest;
import com.Spring.ecom_proj.model.CartItemResponse;
import com.Spring.ecom_proj.service.CartService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody CartItemRequest request) {
        cartService.addToCart(request);
        return ResponseEntity.ok("Item added to cart");
    }

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCartItems(@RequestHeader("Authorization") String token) {
        System.out.println("Token: " + token);
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        List<CartItemResponse> items = cartService.getCartItems();
        return ResponseEntity.ok(items);
    }

//    @GetMapping
//    public ResponseEntity<List<CartItemResponse>> getCartItems() {
//        List<CartItemResponse> items = cartService.getCartItems();
//        return ResponseEntity.ok(items);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return ResponseEntity.ok("Item removed from cart");
    }
}