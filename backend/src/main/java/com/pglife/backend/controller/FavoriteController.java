package com.pglife.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.pglife.backend.service.FavoriteService;
import com.pglife.backend.model.Property;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/add")
    public ResponseEntity<String> addFavorite(
            @RequestParam Long userId,
            @RequestParam Long propertyId) {

        favoriteService.addFavorite(userId, propertyId);
        return ResponseEntity.ok("Added to favorites");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFavorite(
            @RequestParam Long userId,
            @RequestParam Long propertyId) {

        favoriteService.removeFavorite(userId, propertyId);
        return ResponseEntity.ok("Removed from favorites");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Property>> getUserFavorites(@PathVariable Long userId) {

        return ResponseEntity.ok(favoriteService.getUserFavorites(userId));
    }

    @GetMapping("/ping")
    public String ping() {
        return "favorites ok";
    }
}
