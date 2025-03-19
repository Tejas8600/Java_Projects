package com.Spring.ecom_proj.controller;
//
//import com.Spring.ecom_proj.model.User;
//import org.springframework.stereotype.Service;
//
//    @Service
//    public class JwtService {
//
//        public String generateToken(User user) {
//            // Logic to generate JWT token using user details
//            return "jwt-token"; // Placeholder token
//        }
//    }
//
//
//package com.Spring.ecom_proj.service;
//
//import com.Spring.ecom_proj.model.User;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public class JwtService {
//
//    private static final String SECRET_KEY = "mynameistejasmohanpuri"; // 🔑 Keep this secret and secure
//    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
//
//    // ✅ Generate Token
//    public String generateToken(User user) {
//        return Jwts.builder()
//                .setSubject(user.getEmail())
//                .claim("role", user.getRole()) // Add role to token
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Expiration time
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Sign with secret key
//                .compact();
//    }
//
//    // ✅ Extract Username from Token
//    public String extractUsername(String token) {
//        return getClaims(token).getSubject();
//    }
//
//    // ✅ Extract Role from Token
//    public String extractRole(String token) {
//        return (String) getClaims(token).get("role").toString().toUpperCase(); // ✅ Ensure role is always uppercase;
//    }
//
//    // ✅ Check if Token is Valid
//    public boolean isTokenValid(String token, User user) {
//        return extractUsername(token).equals(user.getEmail()) && !isTokenExpired(token);
//    }
//
//    // ✅ Check if Token is Expired
//    private boolean isTokenExpired(String token) {
//        return getClaims(token).getExpiration().before(new Date());
//    }
//
//    // ✅ Extract Claims from Token
//    private Claims getClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//}

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
                .claim("role", user.getRole().toUpperCase())
//                .claim("role", "ROLE_" + user.getRole().toUpperCase()) // Add ROLE_ prefix ✅
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiration
                .signWith(SECRET_KEY) // ✅ Secure signing
                .compact();
    }

//    public Claims extractClaims(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(SECRET_KEY)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
}
