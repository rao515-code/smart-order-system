package com.smartorder.backend.service;

import com.smartorder.backend.dto.OrderRequest;
import com.smartorder.backend.dto.OrderResponse;
import com.smartorder.backend.entity.Order;
import com.smartorder.backend.event.OrderCreatedEvent;
import com.smartorder.backend.repository.OrderRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private static final String ORDER_CREATED_TOPIC = "order.created";

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;

    public OrderService(OrderRepository orderRepository,
                        KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public OrderResponse createOrder(OrderRequest request) {

        Order order = new Order(
                request.getCustomerName(),
                request.getProductName(),
                request.getQuantity(),
                request.getPrice()
        );

        Order savedOrder = orderRepository.save(order);

        OrderCreatedEvent event = new OrderCreatedEvent(
                savedOrder.getId(),
                savedOrder.getCustomerName(),
                savedOrder.getProductName(),
                savedOrder.getQuantity(),
                savedOrder.getPrice(),
                savedOrder.getCreatedAt()
        );

        kafkaTemplate.send(
                ORDER_CREATED_TOPIC,
                savedOrder.getId().toString(),
                event
        );

        return new OrderResponse(savedOrder);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrderResponse::new)
                .toList();
    }

    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        return new OrderResponse(order);
    }
}