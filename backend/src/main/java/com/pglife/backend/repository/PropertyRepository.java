package com.pglife.backend.repository;

import com.pglife.backend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    // Get all properties by city id
    List<Property> findByCityId(Long cityId);

    @Query("SELECT p FROM User u JOIN u.favoriteProperties p WHERE u.id = :userId")
List<Property> findFavoritePropertiesByUserId(@Param("userId") Long userId);
}
