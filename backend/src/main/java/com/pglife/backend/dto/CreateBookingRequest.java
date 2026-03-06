package com.pglife.backend.dto;

public class CreateBookingRequest {
    private Long userId;
    private Long propertyId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPropertyId() { return propertyId; }
    public void setPropertyId(Long propertyId) { this.propertyId = propertyId; }
}