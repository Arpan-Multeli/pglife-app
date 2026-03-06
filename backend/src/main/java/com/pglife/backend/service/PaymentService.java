package com.pglife.backend.service;

import java.util.Map;

public interface PaymentService {
    Map<String, Object> createRazorpayOrder(Long bookingId);
    Map<String, Object> verifyRazorpayPayment(Long bookingId, String orderId, String paymentId, String signature);
}