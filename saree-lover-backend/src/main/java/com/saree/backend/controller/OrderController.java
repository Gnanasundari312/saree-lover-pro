package com.saree.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

import com.saree.backend.model.Order;
import com.saree.backend.dto.OrderRequest;
import com.saree.backend.model.Saree;
import com.saree.backend.repository.OrderRepository;
import com.saree.backend.repository.SareeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderRepository orderRepo;
    private final SareeRepository sareeRepo;

    public OrderController(OrderRepository orderRepo, SareeRepository sareeRepo) {
        this.orderRepo = orderRepo;
        this.sareeRepo = sareeRepo;
    }

    // ⭐ PLACE ORDER
    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {

        Saree saree = sareeRepo.findById(request.getSareeId())
                .orElseThrow(() -> new RuntimeException("Saree not found"));

        Order order = new Order(
                null,
                saree.getId(),
                saree.getName(),
                saree.getPrice(),
                request.getCustomerName(),
                request.getPhone(),
                request.getAddress(),
                request.getPincode()
        );

        return orderRepo.save(order);
    }

    // ⭐ GET ALL ORDERS (Admin)
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // ⭐ GET SINGLE ORDER (Tracking Page)
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        return orderRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ⭐ UPDATE ORDER STATUS (Admin)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody String status) {

        Order order = orderRepo.findById(id).orElse(null);

        if (order == null) return ResponseEntity.notFound().build();

        order.setStatus(status.replace("\"", ""));
        orderRepo.save(order);

        return ResponseEntity.ok(order);
    }
}
