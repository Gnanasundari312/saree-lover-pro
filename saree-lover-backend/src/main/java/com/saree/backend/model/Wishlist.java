package com.saree.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long sareeId;

    // 👉 Join sareeId → Saree table
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sareeId", referencedColumnName = "id", insertable = false, updatable = false)
    private Saree saree;

    public Wishlist() {}

    public Wishlist(Long userId, Long sareeId) {
        this.userId = userId;
        this.sareeId = sareeId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getSareeId() {
        return sareeId;
    }

    public Saree getSaree() {
        return saree;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setSareeId(Long sareeId) {
        this.sareeId = sareeId;
    }

    public void setSaree(Saree saree) {
        this.saree = saree;
    }
}
