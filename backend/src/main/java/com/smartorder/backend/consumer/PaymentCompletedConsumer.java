package com.smartorder.backend.consumer;

import com.smartorder.backend.event.PaymentCompletedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class PaymentCompletedConsumer {

    @KafkaListener(
            topics = "payment.completed",
            groupId = "payment-notification-service"
    )
    public void consumePaymentCompletedEvent(PaymentCompletedEvent event) {

        System.out.println("Payment completed event received from Kafka");
        System.out.println("Payment ID: " + event.getPaymentId());
        System.out.println("Order ID: " + event.getOrderId());
        System.out.println("Customer Name: " + event.getCustomerName());
        System.out.println("Amount: " + event.getAmount());
        System.out.println("Status: " + event.getStatus());
        System.out.println("Transaction ID: " + event.getTransactionId());

        System.out.println(
                "Notification: Payment completed successfully for customer "
                        + event.getCustomerName()
                        + " with transaction ID "
                        + event.getTransactionId()
        );
    }
}