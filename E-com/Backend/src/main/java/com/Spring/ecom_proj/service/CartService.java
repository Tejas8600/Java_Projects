package com.Spring.ecom_proj.service;

import com.Spring.ecom_proj.model.CartItem;
import com.Spring.ecom_proj.model.CartItemRequest;
import com.Spring.ecom_proj.model.CartItemResponse;
import com.Spring.ecom_proj.repo.CartRepository;
import com.Spring.ecom_proj.repo.ProductRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepo productRepository;

    public void addToCart(CartItemRequest request) {
        CartItem cartItem = new CartItem();
        cartItem.setProduct(productRepository.findById(request.getProductId().intValue()).orElseThrow());
        cartItem.setQuantity(request.getQuantity());
        cartRepository.save(cartItem);
    }

    public List<CartItemResponse> getCartItems() {
        return cartRepository.findAll().stream()
                .map(cartItem -> new CartItemResponse(
                        cartItem.getId(),
                        cartItem.getProduct().getName(),
                        cartItem.getQuantity(),
                        cartItem.getProduct().getPrice().doubleValue()
                ))
                .collect(Collectors.toList());
    }

    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }
}