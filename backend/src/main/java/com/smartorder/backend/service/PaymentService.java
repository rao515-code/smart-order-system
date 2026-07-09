package com.smartorder.backend.service;

import com.smartorder.backend.dto.PaymentRequest;
import com.smartorder.backend.dto.PaymentResponse;
import com.smartorder.backend.entity.Payment;
import com.smartorder.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
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