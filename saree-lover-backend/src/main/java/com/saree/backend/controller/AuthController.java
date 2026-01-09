package com.saree.backend.controller;

import com.saree.backend.model.User;
import com.saree.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepo;

    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // ---------- SIGNUP ----------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String password = req.get("password");

        if (userRepo.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        User u = new User(email, password);
        userRepo.save(u);

        return ResponseEntity.ok(u);
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String password = req.get("password");

        Optional<User> user = userRepo.findByEmail(email);

        if (user.isEmpty() || !user.get().getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(user.get());
    }

    // ---------- GET PROFILE ----------
    @GetMapping("/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email) {
        return userRepo.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ---------- UPDATE PROFILE (addresses, etc) ----------
    @PutMapping("/{email}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestBody User data
    ) {
        Optional<User> existing = userRepo.findByEmail(email);

        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        User u = existing.get();

        // update only what we allow (addresses)
        u.setAddresses(data.getAddresses());

        userRepo.save(u);

        return ResponseEntity.ok(u);
    }
}
