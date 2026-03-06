package com.pglife.backend.repository;

import com.pglife.backend.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

    // Get testimonials for a property
    List<Testimonial> findByPropertyId(Long propertyId);
}