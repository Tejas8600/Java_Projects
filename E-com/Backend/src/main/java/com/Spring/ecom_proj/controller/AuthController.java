package com.Spring.ecom_proj.controller;

import com.Spring.ecom_proj.model.User;
import com.Spring.ecom_proj.service.JwtService;
import com.Spring.ecom_proj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/signup-admin")
    public ResponseEntity<?> signupAdmin(@RequestBody LoginRequest request) {
        if (!"SECRET_ADMIN_KEY_123".equals(request.getAdminKey())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin key");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ADMIN");

        userService.registerUser(user);
        return ResponseEntity.ok("Admin registered successfully");
    }


//    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//
//        System.out.println("🔹 Login API Called"); // Log API call
//
//        User user = userService.findByEmail(request.getEmail());
//
//        if (user != null) {
//            System.out.println("🔹 User Found: " + user.getEmail()); // Debug
//
//            // Compare password
//            boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
//            System.out.println("🔹 Password Match: " + passwordMatches);
//
//            if (passwordMatches) {
//                String token = jwtService.generateToken(user);
//                System.out.println("✅ Generated Token: " + token); // Debug token
//                System.out.println("✅ User Role: " + user.getRole()); // Debug role
//
//                // ✅ Return token and role in response
//                return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
//            } else {
//                System.out.println("❌ Password does not match!");
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
//            }
//        }
//
//        // ✅ If user is not found
//        System.out.println("❌ User not found!");
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
//    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        System.out.println("🔹 Login API Called"); // Log API call

        User user = userService.findByEmail(request.getEmail());

        if (user != null) {
            System.out.println("🔹 User Found: " + user.getEmail());
            System.out.println("🔹 Stored Hashed Password: " + user.getPassword());
            System.out.println("🔹 Raw Password Entered: " + request.getPassword());

            boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
            System.out.println("🔹 Password Match: " + passwordMatches);

            if (passwordMatches) {
                // ✅ Role check logic
                String expectedRole = "ROLE_" + request.getRole().toUpperCase();
                if (!("ROLE_" + user.getRole()).equalsIgnoreCase(expectedRole)) {
                    System.out.println("❌ Role mismatch! Expected: " + expectedRole + ", Found: ROLE_" + user.getRole());
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Access denied! Invalid role for login.");
                }

                String token = jwtService.generateToken(user);

                System.out.println("Generated Token: " + token); // Debug token
                System.out.println("User Role: " + user.getRole()); // Debug role

                return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
            } else {
                System.out.println("❌ Password does not match!");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
