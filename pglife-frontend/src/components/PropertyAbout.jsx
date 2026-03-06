import React from 'react';

const PropertyAbout = ({ description }) => {
    // We use a fallback description if the prop is not provided yet
    const defaultDescription = "Furnished studio apartment - share it with close friends! Located in posh area of Bijwasan in Delhi, this house is available for both boys and girls. Go for a private room or opt for a shared one and make it your own abode. Go out with your new friends - catch a movie at the nearest cinema hall or just chill in a cafe which is not even 2 kms away. Unwind with your flatmates after a long day at work/college. With a common living area and a shared kitchen, make your own FRIENDS moments. After all, there's always a Joey with unlimited supply of food. Remember, all it needs is one crazy story to convert a roomie into a BFF. What's nearby/Your New Neighborhood 4.0 Kms from Dwarka Sector- 21 Metro Station.";

    return (
        <div className="property-about page-container container my-4">
            <h1>About the Property</h1>
            <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                {description || defaultDescription}
            </p>
        </div>
    );
};

export default PropertyAbout;