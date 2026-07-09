package com.smartorder.backend.dto;

import java.time.LocalDateTime;

public class PaymentResponse {

    private Long id;
    private Long orderId;
    private String customerName;
    private double amount;
    private String status;
    private String transactionId;
    private LocalDateTime paidAt;

    public PaymentResponse() {
    }

    public PaymentResponse(Long id, Long orderId, String customerName, double amount, String status, String transactionId, LocalDateTime paidAt) {
        this.id = id;
        this.orderId = orderId;
        this.customerName = customerName;
        this.amount = amount;
        this.status = status;
        this.transactionId = transactionId;
        this.paidAt = paidAt;
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }
}