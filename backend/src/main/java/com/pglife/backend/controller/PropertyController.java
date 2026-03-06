package com.pglife.backend.controller;

import com.pglife.backend.model.Property;
import com.pglife.backend.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/properties")
@CrossOrigin
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // Get properties by city
    @GetMapping("/city/{cityId}")
    public List<Property> getPropertiesByCity(@PathVariable Long cityId) {
        return propertyService.getPropertiesByCity(cityId);
    }

    // Get property details
    @GetMapping("/{id}")
    public Property getProperty(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }

}