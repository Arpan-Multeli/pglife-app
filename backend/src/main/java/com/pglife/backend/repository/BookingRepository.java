package com.pglife.backend.repository;

import com.pglife.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_Id(Long userId);
    boolean existsByUser_IdAndProperty_IdAndStatus(Long userId, Long propertyId, com.pglife.backend.model.BookingStatus status);
}