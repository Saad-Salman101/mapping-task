import React, { useState } from 'react';
import io from 'socket.io-client';

const RideBooking = () => {
  const [rideDetails, setRideDetails] = useState({
    startingPoint: { lat: '', lng: '' },
    endingPoint: { lat: '', lng: '' },
    route: '',
    luggageCount: 0,
    childrenCount: 0,
    passengerCount: 1,
  });

  const socket = io('http://localhost:4000'); // Adjust URL as needed

  const handleBookRide = () => {
    // ... Same geocoding and socket emit logic ...

    // Emit ride details to the server
    socket.emit('rideDetails', rideDetails);
  };

  return (
    <div className='flex flex-col w-[80%] mx-auto my-10'>
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
      <input
        type="text"
        className='w-[70%] mt-5 mx-auto'
        placeholder="Route"
        value={rideDetails.route}
        onChange={(e) => setRideDetails({ ...rideDetails, route: e.target.value })}
      />
      <input
        type="number"
        className='w-[70%] mt-5 mx-auto'
        placeholder="Luggage Count"
        value={rideDetails.luggageCount}
        onChange={(e) => setRideDetails({ ...rideDetails, luggageCount: parseInt(e.target.value) })}
      />
      <input
        type="number"
        className='w-[70%] mt-5 mx-auto'
        placeholder="Children Count"
        value={rideDetails.childrenCount}
        onChange={(e) => setRideDetails({ ...rideDetails, childrenCount: parseInt(e.target.value) })}
      />
      <input
        type="number"
        className='w-[70%] mt-5 mx-auto'
        placeholder="Passenger Count"
        value={rideDetails.passengerCount}
        onChange={(e) => setRideDetails({ ...rideDetails, passengerCount: parseInt(e.target.value) })}
      />
      <button onClick={handleBookRide} className='mt-5 bg-blue-500 w-[200px] mx-auto'>Book Ride</button>
    </div>
  );
};

export default RideBooking;
