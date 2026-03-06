package com.pglife.backend.service;

import com.pglife.backend.model.User;
import com.pglife.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register user
    public User registerUser(User user) {

        // normalize email
        user.setEmail(user.getEmail().trim().toLowerCase());

        // ✅ hash password before saving
        user.setPasswordHash(passwordEncoder.encode(user.getPassword()));

        // ✅ remove plain password (so it won't accidentally leak anywhere)
        user.setPassword(null);

        return userRepository.save(user);
    }

    // Login user (for now just fetch by email)
    public Optional<User> loginUser(String email, String password) {
        String normalizedEmail = email.trim().toLowerCase();

        Optional<User> userOpt = userRepository.findByEmail(normalizedEmail);
        if (userOpt.isEmpty())
            return Optional.empty();

        User user = userOpt.get();

        boolean ok = passwordEncoder.matches(password, user.getPasswordHash());
        if (!ok)
            return Optional.empty();

        // Optional: ensure we never send password/hash back
        user.setPassword(null);
        // (and don't expose passwordHash via JSON; ideally @JsonIgnore on passwordHash)

        return Optional.of(user);
    }

    // Get user by id
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}