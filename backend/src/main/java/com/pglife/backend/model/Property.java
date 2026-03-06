package com.pglife.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private BigDecimal rent;
    private Double rating;
    private String imageUrl;
    private String description;
    private String gender;

    // Many properties belong to one city
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    // Many-to-Many with amenities
    @ManyToMany
    @JoinTable(
            name = "properties_amenities",
            joinColumns = @JoinColumn(name = "property_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private List<Amenity> amenities;

    // One property has many testimonials
    @OneToMany(mappedBy = "property")
    @JsonIgnore
    private List<Testimonial> testimonials;

    // Users who favorited this property
    @ManyToMany(mappedBy = "favoriteProperties")
    @JsonIgnore
    private List<User> interestedUsers;

    @JsonProperty("interestedCount")
    public int getInterestedCount() {
        return interestedUsers == null ? 0 : interestedUsers.size();
    }
}
