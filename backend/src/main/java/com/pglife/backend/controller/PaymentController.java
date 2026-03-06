package com.pglife.backend.controller;

import com.pglife.backend.dto.CreateOrderRequest;
import com.pglife.backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pglife.backend.dto.VerifyPaymentRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request) {
        Map<String, Object> res = paymentService.createRazorpayOrder(request.getBookingId());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody VerifyPaymentRequest req) {
        return ResponseEntity.ok(
                paymentService.verifyRazorpayPayment(
                        req.getBookingId(),
                        req.getRazorpayOrderId(),
                        req.getRazorpayPaymentId(),
                        req.getRazorpaySignature()));
    }
}