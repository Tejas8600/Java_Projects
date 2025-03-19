package com.Spring.ecom_proj.controller;

import com.Spring.ecom_proj.model.User;
import com.Spring.ecom_proj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;




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

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User user) {
//        Optional<User> loginUser = userService.loginUser(user.getEmail(), user.getPassword());
//        if (loginUser.isPresent()) {
//            return ResponseEntity.ok(loginUser.get());
//        } else {
//            return ResponseEntity.status(401).body("Invalid email or password");
//        }
//    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {


        System.out.println("🔹 Login API Called"); // Log API call
        // Fetch all users to see what's stored
        List<User> allUsers = userService.getAllUsers();
        System.out.println("🔎 All Users in DB: " + allUsers);



        User user = userService.findByEmail(request.getEmail());

        if (user != null) {
            System.out.println("🔹 User Found: " + user.getEmail());//  Debug
            System.out.println("🔹 Stored Hashed Password: " + user.getPassword());//  Debug
            System.out.println("🔹 Raw Password Entered: " + request.getPassword());//  Debug

            boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
            System.out.println("🔹 Password Match: " + passwordMatches);

            if (passwordMatches) {
                String token = jwtService.generateToken(user);

                System.out.println("Generated Token: " + token); //  Debug token
                System.out.println("User Role: " + user.getRole()); //  Debug role

                return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
            } else {
                System.out.println("❌ Password does not match!");
            }
        }



        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {


            // Extract the raw password from request
            String rawPassword = request.getPassword();
            // Extract the hashed password from the database
            String storedHashedPassword = user.getPassword();
            System.out.println("Raw Password: " + rawPassword); // Debug log for input password
            System.out.println("Stored Hashed Password: " + storedHashedPassword); // Debug log for database password


            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
//
//package com.Spring.ecom_proj.controller;
//
//import com.Spring.ecom_proj.model.User;
//import com.Spring.ecom_proj.service.UserService;
//import com.Spring.ecom_proj.service.JwtService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//public class AuthController {
//
//    @Autowired
//    private JwtService jwtService;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private UserService userService;
//
//    // ✅ Signup for USER
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody User user) {
//        try {
//            user.setPassword(passwordEncoder.encode(user.getPassword())); // ✅ Encode password
//            user.setRole("USER"); // ✅ Default role as USER
//            User registeredUser = userService.registerUser(user);
//            return ResponseEntity.ok(registeredUser);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    // ✅ Signup for ADMIN with SECRET KEY
//    @PostMapping("/signup-admin")
//    public ResponseEntity<?> signupAdmin(@RequestBody LoginRequest request) {
//        if (!"SECRET_ADMIN_KEY_123".equals(request.getAdminKey())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin key");
//        }
//
//        User user = new User();
//        user.setEmail(request.getEmail());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRole("ADMIN");
//
//        userService.registerUser(user);
//        return ResponseEntity.ok("Admin registered successfully");
//    }
//
//    // ✅ Login with JWT Token Generation
//    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        User user = userService.findByEmail(request.getEmail());
//
//        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//            String token = jwtService.generateToken(user);
//            System.out.println("Generated Token: " + token); // Debugging
//            return ResponseEntity.ok(new AuthResponse(token, user.getRole())); // ✅ Return token and role
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//    }
//
//}