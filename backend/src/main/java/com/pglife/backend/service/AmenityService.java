package com.pglife.backend.service;

import com.pglife.backend.model.Amenity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pglife.backend.repository.AmenityRepository;

@Service
public class AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    public List<Amenity> getAllAmenities() {
        return amenityRepository.findAll();
    }

    public List<Amenity> getAmenitiesByPropertyId(Long propertyId) {
        return amenityRepository.findAmenitiesByPropertyId(propertyId);
    }
}