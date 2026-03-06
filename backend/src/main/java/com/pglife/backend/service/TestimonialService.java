package com.pglife.backend.service;

import com.pglife.backend.model.Testimonial;
import com.pglife.backend.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialService {

    @Autowired
    private TestimonialRepository testimonialRepository;

    public List<Testimonial> getTestimonialsByProperty(Long propertyId) {
        return testimonialRepository.findByPropertyId(propertyId);
    }

    public Testimonial saveTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }
}