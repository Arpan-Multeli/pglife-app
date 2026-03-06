package com.pglife.backend.service;

import com.pglife.backend.model.Booking;

public interface BookingService {
    Booking createBooking(Long userId, Long propertyId);
}