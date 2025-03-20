package com.Spring.ecom_proj.service;

import com.Spring.ecom_proj.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // ✅ Secure key

    public String generateToken(User user) {
        System.out.println("JwtService is being called"); //  Debug

        return Jwts.builder()
                .setSubject(user.getEmail())
//                .claim("role", user.getRole().toUpperCase())
                .claim("role", "ROLE_" + user.getRole().toUpperCase()) // Add ROLE_ prefix ✅
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiration
                .signWith(SECRET_KEY) // ✅ Secure signing
                .compact();
    }


    // 403 Forbidden testing
    public String extractEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject(); // ✅ Extract email from token
    }

    public String extractRole(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        // ✅ Ensure ROLE_ prefix consistency
        String role = (String) claims.get("role");
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }
        return role; //  Extract role from token
    }

    public boolean validateToken(String token, User user) {
        String email = extractEmail(token);
        return (email.equals(user.getEmail()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }



}
