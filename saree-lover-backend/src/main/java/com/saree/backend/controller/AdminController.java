package com.saree.backend.controller;

import com.saree.backend.model.Admin;
import com.saree.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/add")
    public ResponseEntity<Admin> addAdmin(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam("image") MultipartFile imageFile
    ) throws Exception {

        // generate unique name
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();

        // save file into uploads folder
        Path path = Paths.get("uploads/" + fileName);
        Files.write(path, imageFile.getBytes());

        // create admin object
        Admin admin = new Admin();
        admin.setName(name);
        admin.setCategory(category);
        admin.setPrice(price);

        // IMPORTANT: store PUBLIC URL
        String imageUrl = "http://localhost:8080/uploads/" + fileName;
        admin.setImagePath(imageUrl);

        // save
        adminRepository.save(admin);

        // return created object
        return ResponseEntity.ok(admin);
    }

    @GetMapping
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAdmin(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price
    ) {
        Admin admin = adminRepository.findById(id).orElse(null);
        if (admin == null) return ResponseEntity.badRequest().body("Item not found");

        admin.setName(name);
        admin.setCategory(category);
        admin.setPrice(price);

        adminRepository.save(admin);
        return ResponseEntity.ok("Updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        adminRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
