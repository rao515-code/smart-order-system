package com.smartorder.backend.service;

import com.smartorder.backend.dto.PaymentRequest;
import com.smartorder.backend.dto.PaymentResponse;
import com.smartorder.backend.entity.Payment;
import com.smartorder.backend.event.PaymentCompletedEvent;
import com.smartorder.backend.repository.PaymentRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    private static final String PAYMENT_COMPLETED_TOPIC = "payment.completed";

    private final PaymentRepository paymentRepository;
    private final KafkaTemplate<String, PaymentCompletedEvent> kafkaTemplate;

    public PaymentService(
            PaymentRepository paymentRepository,
            KafkaTemplate<String, PaymentCompletedEvent> kafkaTemplate
    ) {
        this.paymentRepository = paymentRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public PaymentResponse processPayment(PaymentRequest paymentRequest) {

        String transactionId = "PAY-" + System.currentTimeMillis();

        Payment payment = new Payment(
                paymentRequest.getOrderId(),
                paymentRequest.getCustomerName(),
                paymentRequest.getAmount(),
                "SUCCESS",
                transactionId,
                LocalDateTime.now()
        );

        Payment savedPayment = paymentRepository.save(payment);

        PaymentCompletedEvent paymentCompletedEvent = new PaymentCompletedEvent(
                savedPayment.getId(),
                savedPayment.getOrderId(),
                savedPayment.getCustomerName(),
                savedPayment.getAmount(),
                savedPayment.getStatus(),
                savedPayment.getTransactionId()
        );

        kafkaTemplate.send(PAYMENT_COMPLETED_TOPIC, paymentCompletedEvent);

        System.out.println("Payment completed event sent to Kafka: " + savedPayment.getTransactionId());

        return mapToPaymentResponse(savedPayment);
    }

    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getOrderId(),
                payment.getCustomerName(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getTransactionId(),
                payment.getPaidAt()
        );
    }
}