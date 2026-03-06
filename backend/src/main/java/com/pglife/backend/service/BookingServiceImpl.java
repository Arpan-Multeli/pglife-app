package com.pglife.backend.service;

import com.pglife.backend.model.Booking;
import com.pglife.backend.model.BookingStatus;
import com.pglife.backend.model.Property;
import com.pglife.backend.model.User;
import com.pglife.backend.repository.BookingRepository;
import com.pglife.backend.repository.PropertyRepository;
import com.pglife.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
            UserRepository userRepository,
            PropertyRepository propertyRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
    }

    @Override
    public Booking createBooking(Long userId, Long propertyId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found: " + propertyId));

        // optional: prevent duplicate confirmed booking for same property
        boolean alreadyBooked = bookingRepository.existsByUser_IdAndProperty_IdAndStatus(
                userId, propertyId, BookingStatus.CONFIRMED);
        if (alreadyBooked) {
            throw new RuntimeException("Already booked this property");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setProperty(property);

        BigDecimal rent = property.getRent();

        if (rent == null || rent.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invalid rent for property: " + propertyId);
        }

        long amountInPaise = rent
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .longValueExact();

        booking.setAmount(amountInPaise);
        booking.setStatus(BookingStatus.PENDING);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }
}