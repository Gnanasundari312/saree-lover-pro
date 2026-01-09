package com.saree.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sareeId;
    private String sareeName;
    private int price;

    private String customerName;
    private String phone;
    private String address;
    private String pincode;

    // ⭐ ORDER STATUS (default when created)
    @Column(nullable = false)
    private String status = "Ordered";

    // Default constructor (required by JPA)
    public Order() {
    }

    // Constructor used in OrderController
    public Order(
            Long id,
            Long sareeId,
            String sareeName,
            int price,
            String customerName,
            String phone,
            String address,
            String pincode
    ) {
        this.id = id;
        this.sareeId = sareeId;
        this.sareeName = sareeName;
        this.price = price;
        this.customerName = customerName;
        this.phone = phone;
        this.address = address;
        this.pincode = pincode;
        // status will automatically be "Ordered"
    }

    // GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSareeId() {
        return sareeId;
    }

    public void setSareeId(Long sareeId) {
        this.sareeId = sareeId;
    }

    public String getSareeName() {
        return sareeName;
    }

    public void setSareeName(String sareeName) {
        this.sareeName = sareeName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    // ⭐ STATUS getter/setter
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
