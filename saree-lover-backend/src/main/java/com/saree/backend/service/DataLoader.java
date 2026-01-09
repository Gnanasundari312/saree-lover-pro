package com.saree.backend.service;
import com.saree.backend.model.Saree;
import com.saree.backend.repository.SareeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final SareeRepository sareeRepo;

    public DataLoader(SareeRepository sareeRepo) {
        this.sareeRepo = sareeRepo;
    }

    @Override
    public void run(String... args) {

        
    	if (sareeRepo.count() == 0) {

           
            sareeRepo.save(new Saree(null, "Banarasi Silk Saree", "Silk", 2500, "/uploads/saree1.jpg"));
            sareeRepo.save(new Saree(null, "Kanchipuram Saree", "Traditional", 3500, "/uploads/saree2.jpg"));
            sareeRepo.save(new Saree(null, "Cotton Saree", "Casual", 1500, "/uploads/saree3.jpg"));
            sareeRepo.save(new Saree(null, "Designer Silk Saree", "Silk", 4500, "/uploads/saree1.jpg"));
            sareeRepo.save(new Saree(null, "Printed Cotton Saree", "Casual", 1200, "/uploads/saree3.jpg"));

        }
    }
}

