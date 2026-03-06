package com.pglife.backend.service;

import com.pglife.backend.model.Property;
import com.pglife.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    // Get properties by city
    public List<Property> getPropertiesByCity(Long cityId) {
        return propertyRepository.findByCityId(cityId);
    }

    // Get property by id
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getFavoriteProperties(Long userId) {
    return propertyRepository.findFavoritePropertiesByUserId(userId);
}
}