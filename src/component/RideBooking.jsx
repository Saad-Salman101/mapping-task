import React, { useState } from 'react';
import io from 'socket.io-client';

const RideBooking = () => {
  const [rideDetails, setRideDetails] = useState({
    startingPoint: { lat: '', lng: '' },
    endingPoint: { lat: '', lng: '' },
    // Other ride details...
  });

  const socket = io('http://localhost:3000'); // Adjust URL as needed

  const handleBookRide = () => {
    // Use Google Maps Geocoder to get coordinates for starting and ending addresses
    const geocoder = new window.google.maps.Geocoder();

    // Geocode starting address
    geocoder.geocode({ address: rideDetails.startingPoint.address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;
        setRideDetails(prevDetails => ({
          ...prevDetails,
          startingPoint: { lat: lat(), lng: lng() }
        }));
      } else {
        console.error('Geocoding failed for starting address:', status);
      }
    });

    // Geocode ending address
    geocoder.geocode({ address: rideDetails.endingPoint.address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;
        setRideDetails(prevDetails => ({
          ...prevDetails,
          endingPoint: { lat: lat(), lng: lng() }
        }));
      } else {
        console.error('Geocoding failed for ending address:', status);
      }
    });

    // Emit ride details to the server
    socket.emit('rideDetails', rideDetails);
  };

  return (
    <div className='flex flex-col w-[80%] mx-auto mt-5'>
      {/* UI components for inputting ride details */}
      <input
        type="text"
        className='w-[70%] mx-auto'
        placeholder="Starting Address"
        value={rideDetails.startingPoint.address}
        onChange={(e) => setRideDetails({ ...rideDetails, startingPoint: { ...rideDetails.startingPoint, address: e.target.value } })}
      />
      <input
        type="text"
        className='w-[70%] mt-5 mx-auto'
        placeholder="Ending Address"
        value={rideDetails.endingPoint.address}
        onChange={(e) => setRideDetails({ ...rideDetails, endingPoint: { ...rideDetails.endingPoint, address: e.target.value } })}
      />
      {/* Other ride details input fields */}
      <button onClick={handleBookRide} className='mt-5 bg-blue-500 w-[200px] mx-auto'>Book Ride</button>
    </div>
  );
};

export default RideBooking;
