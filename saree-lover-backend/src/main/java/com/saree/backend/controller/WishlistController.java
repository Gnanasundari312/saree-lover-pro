package com.saree.backend.controller;

import com.saree.backend.model.Saree;
import com.saree.backend.model.Wishlist;
import com.saree.backend.repository.SareeRepository;
import com.saree.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000") // React frontend URL
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private SareeRepository sareeRepository;

    // ✅ Get wishlist with full saree details
    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(@PathVariable Long userId) {
        List<Wishlist> wishlist = wishlistRepository.findByUserId(userId);

        // Populate saree for each wishlist item (important for new items)
        wishlist.forEach(item -> {
            Saree saree = sareeRepository.findById(item.getSareeId()).orElse(null);
            item.setSaree(saree);
        });

        return wishlist;
    }

    // ✅ Remove saree from wishlist
    @DeleteMapping("/{userId}/remove/{sareeId}")
    public ResponseEntity<String> removeFromWishlist(
            @PathVariable Long userId,
            @PathVariable Long sareeId
    ) {
        return wishlistRepository.findByUserIdAndSareeId(userId, sareeId)
                .map(item -> {
                    wishlistRepository.delete(item);
                    return ResponseEntity.ok("Removed from wishlist");
                })
                .orElse(ResponseEntity.status(404).body("Item not found in wishlist"));
    }

    // ✅ Add to wishlist
    @PostMapping("/{userId}/add/{sareeId}")
    public ResponseEntity<Wishlist> addToWishlist(
            @PathVariable Long userId,
            @PathVariable Long sareeId
    ) {
        Wishlist wishlist = new Wishlist(userId, sareeId);
        wishlistRepository.save(wishlist);

        // Fetch saree object so frontend gets full details
        Saree saree = sareeRepository.findById(sareeId).orElse(null);
        wishlist.setSaree(saree);

        return ResponseEntity.ok(wishlist);
    }
}
