-- Insert Cities
INSERT INTO cities (name) VALUES 
('Mumbai'),
('Delhi'),
('Bangalore'),
('Hyderabad');

-- Insert Properties for Mumbai (city_id = 1)
INSERT INTO properties (city_id, name, address, description, gender, rent, image_url,rating) VALUES 
(1, 'Navkar Paying Guest', 'Juhu, Mumbai', 'Spacious and well-maintained PG with excellent facilities in the heart of Mumbai. Great for working professionals.', 'male', 9500, '/img/properties/1/1d4f0757fdb86d5f.jpg', 4.5),
(1, 'Ganpati Paying Guest', 'Borivali East, Mumbai', 'Premium PG accommodation with modern amenities. Located near metro station with easy access to business districts.', 'unisex', 8500, '/img/properties/1/46ebbb537aa9fb0a.jpg', 4.8),
(1, 'PG for Girls Borivali', 'Gorai No.2, Mumbai', 'Secure and comfortable PG for girls with 24/7 security. Close to shopping malls and entertainment areas.', 'female', 8000, '/img/properties/1/eace7b9114fd6046.jpg', 4.3),
(1, 'Crown Residency Mumbai', 'Fort, Mumbai', 'Luxury PG in prime location with premium facilities including gym and study areas.', 'unisex', 12000, '/img/properties/1/1d4f0757fdb86d5f.jpg', 4.9);

-- Insert Properties for Delhi (city_id = 2)
INSERT INTO properties (city_id, name, address, description, gender, rent, image_url,rating) VALUES 
(2, 'Delhi Dreams Hostel', 'CP, New Delhi', 'Well-located PG near Connaught Place with easy metro access. Perfect for students and professionals.', 'male', 7500, '/img/properties/2/1dcfc57947b5c712.jpg', 4.4),
(2, 'Girls PG Safdarjung', 'Safdarjung, Delhi', 'Safe and secure accommodation for girls with friendly atmosphere and supportive management.', 'female', 8000, '/img/properties/2/45109c3e5c063d21.jpg', 4.6),
(2, 'Vikas Nagar PG', 'Vikas Nagar, Delhi', 'Budget-friendly PG with basic amenities. Great for students. Walking distance from metro.', 'male', 5500, '/img/properties/2/46ebbb537aa9fb0a.jpg', 4.1),
(2, 'Premium Delhi Residence', 'Greater Kailash, Delhi', 'Premium PG in upscale locality with high-end amenities and excellent management.', 'unisex', 11000, '/img/properties/2/6343da10f7206b0f.jpg', 4.8);

-- Insert Properties for Bangalore (city_id = 3)
INSERT INTO properties (city_id, name, address, description, gender, rent, image_url,rating) VALUES 
(3, 'Tech Park Residency', 'Whitefield, Bangalore', 'Modern PG in IT hub with fast internet and co-working spaces. Ideal for tech professionals.', 'male', 9000, '/img/properties/3/1d4f0757fdb86d5f.jpg', 4.5),
(3, 'Koramangala Girls PG', 'Koramangala, Bangalore', 'Vibrant locality with excellent food and entertainment. Safe environment for women.', 'female', 7800, '/img/properties/3/1d4f0757fdb86d5f.jpg', 4.8),
(3, 'Marathahalli PG House', 'Marathahalli, Bangalore', 'Spacious rooms with excellent connectivity to office parks. Great for IT employees.', 'male', 8500, '/img/properties/3/1d4f0757fdb86d5f.jpg', 4.4),
(3, 'Indiranagar Premium Stay', 'Indiranagar, Bangalore', 'Trendy neighborhood with premium facilities and vibrant community atmosphere.', 'unisex', 10000, '/img/properties/3/1d4f0757fdb86d5f.jpg', 4.7);

-- Insert Properties for Hyderabad (city_id = 4)
INSERT INTO properties (city_id, name, address, description, gender, rent, image_url,rating) VALUES
(4, 'Hi-Tech City Guest House', 'Hi-Tech City, Hyderabad', 'Modern PG in technology zone with excellent infrastructure and convenient location.', 'male', 8000, '/img/properties/4/1d4f0757fdb86d5f.jpg', 4.6),
(4, 'Gachibowli Girls Hostel', 'Gachibowli, Hyderabad', 'Safe and clean accommodation for girls with modern facilities and caring management.', 'female', 7500, '/img/properties/4/1d4f0757fdb86d5f.jpg', 4.4),
(4, 'Lalaguda Paying Guest', 'Lalaguda, Hyderabad', 'Affordable and comfortable PG with family-like atmosphere. Excellent for students.', 'unisex', 6500, '/img/properties/4/1d4f0757fdb86d5f.jpg', 4.3),
(4, 'Jubilee Hills Premium PG', 'Jubilee Hills, Hyderabad', 'Luxury PG in exclusive area with high-end amenities and professional management.', 'unisex', 11500, '/img/properties/4/1d4f0757fdb86d5f.jpg', 4.9);

-- Insert Amenities
INSERT INTO amenities (name, type, icon) VALUES 
('WiFi', 'utility', 'fa-wifi'),
('AC/Heating', 'utility', 'fa-snowflake'),
('Parking', 'facility', 'fa-parking'),
('Gym', 'facility', 'fa-dumbbell'),
('Laundry', 'utility', 'fa-soap'),
('TV', 'utility', 'fa-television'),
('Kitchen', 'facility', 'fa-utensils'),
('Security Cameras', 'security', 'fa-camera');
