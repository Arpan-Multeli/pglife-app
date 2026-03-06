package com.pglife.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // One city has many properties
    @OneToMany(mappedBy = "city")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Property> properties;
}
    