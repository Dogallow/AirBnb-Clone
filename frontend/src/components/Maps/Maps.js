import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const center = {
    lat: 38.9072,
    lng: 77.0369,
};

const Maps = ({ apiKey, lat, lng }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    if (lat === 0 || lng === 0) return null

    const center = {
        lat,
        lng
    };

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    
                >
                    <Marker position={center}/>
                </GoogleMap >
            )}
        </>
    );
};

export default React.memo(Maps);
