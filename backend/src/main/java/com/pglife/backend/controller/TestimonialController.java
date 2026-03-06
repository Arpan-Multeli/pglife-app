package com.pglife.backend.controller;

import com.pglife.backend.model.Testimonial;
import com.pglife.backend.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@CrossOrigin
public class TestimonialController {

    @Autowired
    private TestimonialService testimonialService;

    // Get testimonials by property
    @GetMapping("/property/{propertyId}")
    public List<Testimonial> getTestimonials(
            @PathVariable Long propertyId) {
        return testimonialService.getTestimonialsByProperty(propertyId);
    }

    // Add testimonial
    @PostMapping
    public Testimonial addTestimonial(
            @RequestBody Testimonial testimonial) {
        return testimonialService.saveTestimonial(testimonial);
    }
}