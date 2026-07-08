package com.smartorder.backend.consumer;

import com.smartorder.backend.event.OrderCreatedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedConsumer {

    @KafkaListener(topics = "order.created", groupId = "notification-service")
    public void consume(OrderCreatedEvent event) {
        System.out.println("=================================");
        System.out.println("New order event received from Kafka");
        System.out.println("Order ID: " + event.getOrderId());
        System.out.println("Customer: " + event.getCustomerName());
        System.out.println("Product: " + event.getProductName());
        System.out.println("Quantity: " + event.getQuantity());
        System.out.println("Price: " + event.getPrice());
        System.out.println("Created At: " + event.getCreatedAt());
        System.out.println("=================================");
    }
}