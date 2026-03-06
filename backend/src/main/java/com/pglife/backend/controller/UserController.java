package com.pglife.backend.controller;

import com.pglife.backend.model.User;
import com.pglife.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> existingUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (existingUser.isPresent() &&
                existingUser.get().getPassword().equals(user.getPassword())) {

            return ResponseEntity.ok(existingUser.get());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Credentials");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}