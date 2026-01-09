package com.saree.backend.dto;

public class OrderRequest {

    private Long sareeId;
    private String customerName;
    private String phone;
    private String address;
    private String pincode;

    public Long getSareeId() {
        return sareeId;
    }

    public void setSareeId(Long sareeId) {
        this.sareeId = sareeId;
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
}
