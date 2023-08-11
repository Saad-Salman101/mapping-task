const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));


const server = http.createServer(app);
// const io = socketIo(server);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
const PORT = process.env.PORT || 4000;

const connectedClients = {};
const rideDetailsArray = []; // Array to store ride details

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('rideDetails', (rideDetails) => {
    console.log('Received ride details:', rideDetails);
    rideDetailsArray.push(rideDetails); // Store ride details in the array

    // Broadcast the ride details to other clients
    socket.broadcast.emit('newRideDetails', rideDetails);

    // You can also emit the updated ride details to all clients if needed
    io.emit('updatedRideDetails', rideDetailsArray);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
