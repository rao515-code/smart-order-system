package com.smartorder.backend.dto;

import com.smartorder.backend.entity.Order;
import com.smartorder.backend.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderResponse {

    private Long id;
    private String customerName;
    private String productName;
    private Integer quantity;
    private BigDecimal price;
    private OrderStatus status;
    private LocalDateTime createdAt;

    public OrderResponse() {
    }

    public OrderResponse(Order order) {
        this.id = order.getId();
        this.customerName = order.getCustomerName();
        this.productName = order.getProductName();
        this.quantity = order.getQuantity();
        this.price = order.getPrice();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getProductName() {
        return productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}