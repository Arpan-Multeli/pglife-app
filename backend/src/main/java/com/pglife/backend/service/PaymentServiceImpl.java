package com.pglife.backend.service;

import com.pglife.backend.model.Booking;
import com.pglife.backend.model.Payment;
import com.pglife.backend.model.PaymentGateway;
import com.pglife.backend.model.PaymentStatus;
import com.pglife.backend.repository.BookingRepository;
import com.pglife.backend.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import com.pglife.backend.model.BookingStatus;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    @Value("${razorpay.key_id}")
    private String keyId;
    @Value("${razorpay.key_secret}")
    private String keySecret;

    public PaymentServiceImpl(RazorpayClient razorpayClient,
            BookingRepository bookingRepository,
            PaymentRepository paymentRepository) {
        this.razorpayClient = razorpayClient;
        this.bookingRepository = bookingRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Map<String, Object> createRazorpayOrder(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));

        long amountInPaise = booking.getAmount(); // already stored in paise

        try {
            JSONObject options = new JSONObject();
            options.put("amount", amountInPaise);
            options.put("currency", "INR");
            options.put("receipt", "booking_" + bookingId);

            Order order = razorpayClient.orders.create(options);

            // Save payment entry
            Payment payment = new Payment();
            payment.setBooking(booking);
            payment.setGateway(PaymentGateway.RAZORPAY);
            payment.setOrderId(order.get("id"));
            payment.setStatus(PaymentStatus.CREATED);
            paymentRepository.save(payment);

            Map<String, Object> res = new HashMap<>();
            res.put("keyId", keyId); // frontend needs this
            res.put("orderId", order.get("id"));
            res.put("amount", amountInPaise);
            res.put("currency", "INR");
            res.put("bookingId", bookingId);

            return res;

        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }

    }

    private String hmacSha256(String data, String secret) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();
            for (byte b : hash)
                sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("HMAC error: " + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> verifyRazorpayPayment(Long bookingId, String orderId, String paymentId,
            String signature) {

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for orderId: " + orderId));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));

        // Verify signature
        String payload = orderId + "|" + paymentId;
        String expectedSignature = hmacSha256(payload, keySecret);

        if (!expectedSignature.equals(signature)) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);

            booking.setStatus(BookingStatus.FAILED);
            bookingRepository.save(booking);

            throw new RuntimeException("Payment signature verification failed");
        }

        // Update payment success details
        payment.setPaymentId(paymentId);
        payment.setSignature(signature);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(LocalDateTime.now());
        paymentRepository.save(payment);

        // Confirm booking
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Payment verified and booking confirmed");
        res.put("bookingStatus", booking.getStatus().toString());
        return res;
    }
}