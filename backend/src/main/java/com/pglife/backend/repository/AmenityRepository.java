package com.pglife.backend.repository;

import com.pglife.backend.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {

    @Query(value = """
        SELECT a.* 
        FROM amenities a
        JOIN properties_amenities pa ON pa.amenity_id = a.id
        WHERE pa.property_id = :propertyId
        """, nativeQuery = true)
    List<Amenity> findAmenitiesByPropertyId(@Param("propertyId") Long propertyId);
}