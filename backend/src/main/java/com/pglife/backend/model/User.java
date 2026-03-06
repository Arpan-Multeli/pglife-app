package com.pglife.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;
    private String phone;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @jakarta.persistence.Transient
    private String password;
    @Column(name = "college_name")
    private String collegeName;
    private String gender;

    @JsonIgnore
    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    // Many-to-Many favorite properties
    @ManyToMany
    @JoinTable(name = "interested_users_properties", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "property_id"))
    @JsonIgnore
    private List<Property> favoriteProperties = new ArrayList<>();

    // One user can give many testimonials
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Testimonial> testimonials;
}
