package com.pglife.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.pglife.backend.repository.UserRepository;
import com.pglife.backend.repository.PropertyRepository;
import com.pglife.backend.model.User;
import com.pglife.backend.model.Property;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public void addFavorite(Long userId, Long propertyId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!user.getFavoriteProperties().contains(property)) {
            user.getFavoriteProperties().add(property);
            userRepository.save(user);
        }
    }

    public void removeFavorite(Long userId, Long propertyId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        user.getFavoriteProperties().remove(property);
        userRepository.save(user);
    }

    public List<Property> getUserFavorites(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getFavoriteProperties();
    }
}
