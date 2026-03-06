package com.pglife.backend.controller;

import com.pglife.backend.model.Amenity;
import com.pglife.backend.service.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
@CrossOrigin
public class AmenityController {

    @Autowired
    private AmenityService amenityService;

    @GetMapping
    public List<Amenity> getAllAmenities() {
        return amenityService.getAllAmenities();
    }

    @GetMapping("/property/{propertyId}")
    public List<Amenity> getAmenitiesByProperty(@PathVariable Long propertyId) {
        return amenityService.getAmenitiesByPropertyId(propertyId);
    }
}
