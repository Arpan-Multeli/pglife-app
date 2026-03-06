package com.pglife.backend.controller;

import com.pglife.backend.dto.CreateBookingRequest;
import com.pglife.backend.model.Booking;
import com.pglife.backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody CreateBookingRequest request) {

        Booking booking = bookingService.createBooking(
        request.getUserId(),
        request.getPropertyId()
);
        Map<String, Object> res = new HashMap<>();
        res.put("bookingId", booking.getId());
        res.put("status", booking.getStatus());
        res.put("amount", booking.getAmount());

        return ResponseEntity.ok(res);
    }
}