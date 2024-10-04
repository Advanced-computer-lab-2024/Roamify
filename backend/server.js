const express = require('express');
const mongoose = require('mongoose');
const Place = require('./models/placeModel.js');
const Itinerary  = require('./models/ItineraryModel.js');
const Activity = require('./models/activityModel');

mongoose.connect('mongodb+srv://ramez123:ramez123@cluster0.n40or.mongodb.net/node-tuts?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
     // Insert places after connecting
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON bodies

// Places data to insert


//mongoose.set('validateBeforeSave', true); // Run validation before save

// Schema debugging
//console.log("Schema paths:", Place.schema.paths);


const dummyActivities = [
    {
      name: 'Cultural Dance Show',
      date: '2024-10-15',
      time: '19:00',
      location: {
        latitude: 40.7128,
        longitude: -74.0060
      },
      price: 50,
      category: 'Cultural',
      tagPlace: 'New York City',
      advertiserId: 'ADV123',
      rating: 4.7
    },
    {
      name: 'Sunset Boat Ride',
      date: '2024-11-10',
      time: '17:30',
      location: {
        latitude: 34.0522,
        longitude: -118.2437
      },
      price: 75,
      category: 'Recreational',
      tagPlace: 'Los Angeles',
      advertiserId: 'ADV456',
      rating: 4.9
    },
    {
      name: 'Mountain Hiking Adventure',
      date: '2024-12-05',
      time: '06:00',
      location: {
        latitude: 37.7749,
        longitude: -122.4194
      },
      price: 100,
      category: 'Adventure',
      tagPlace: 'San Francisco',
      advertiserId: 'ADV789',
      rating: 4.8
    }
  ];
  
  // Insert the dummy activities into the database
  Activity.insertMany(dummyActivities)
    .then(() => {
      console.log('Dummy activities successfully inserted!');
      mongoose.connection.close(); // Close the connection after insertion
    })
    .catch((err) => {
      console.error('Error inserting dummy activities:', err);
      mongoose.connection.close();
    });


// Function to insert places


// Define routes here
// e.g. app.use('/api', yourRoute);


//const filterRoute = require('./routes/filterRoute');
//app.use('/api',filterRoute);
const searchRoute=require('./routes/search_Route.js');
app.use('/api',searchRoute);
const filter_placeRoute=require('./routes/filterPlaceRoute.js');
app.use('/api',filter_placeRoute);
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
