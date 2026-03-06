package com.pglife.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;


@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "property_id")
    private Property property;

    @Column(nullable = false)
    private Long amount; // store in paise for safety (e.g., 19900 = ₹199)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

   
}