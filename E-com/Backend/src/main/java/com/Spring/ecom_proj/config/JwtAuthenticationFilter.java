package com.Spring.ecom_proj.config;

import com.Spring.ecom_proj.service.JwtService;
import com.Spring.ecom_proj.model.User;
import com.Spring.ecom_proj.repo.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    // ✅ Constructor Injection (Preferred)
    public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // ✅ Remove "Bearer " prefix

            try {
                String email = jwtService.extractEmail(token);
                String role = jwtService.extractRole(token);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    User user = userRepository.findByEmail(email).orElse(null);

                    if (user != null && jwtService.validateToken(token, user)) {

                        // ✅ Ensure "ROLE_" prefix for consistency
                        String grantedAuthority = role.startsWith("ROLE_") ? role : "ROLE_" + role;

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        user, null, Collections.singleton(new SimpleGrantedAuthority(grantedAuthority))
                                );

                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        System.out.println("✅ User authenticated: " + email + " with role: " + grantedAuthority);
                    }
                }
            } catch (Exception e) {
                System.out.println("❌ Invalid JWT Token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}