package com.saree.backend.controller;

import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.saree.backend.model.Saree;
import com.saree.backend.repository.SareeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/sarees")
public class SareeController {

    private final SareeRepository sareeRepo;

    public SareeController(SareeRepository sareeRepo) {
        this.sareeRepo = sareeRepo;
    }

    // ✅ GET API - Fetch all sarees (Products page)
    @GetMapping
    public List<Saree> getAllSarees() {
        return sareeRepo.findAll();
    }

    // ✅ POST API - Upload saree + image (Admin page)
    @PostMapping
    public Saree addSaree(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam int price,
            @RequestParam MultipartFile image
    ) throws Exception {

        // 1️⃣ Create uploads folder if not exists
        String uploadDir = "uploads/";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 2️⃣ Create unique image name
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

        // 3️⃣ Save image in uploads folder
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);

        // 4️⃣ Save saree details in DB
        Saree saree = new Saree();
        saree.setName(name);
        saree.setCategory(category);
        saree.setPrice(price);

        // 🔥 MOST IMPORTANT LINE
        saree.setImageUrl("/uploads/" + fileName);

        return sareeRepo.save(saree);
    }
}
