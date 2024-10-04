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




// Function to insert places


// Define routes here
// e.g. app.use('/api', yourRoute);


//const filterRoute = require('./routes/filterRoute');
//app.use('/api',filterRoute);
const searchRoute=require('./routes/search_Route.js');
app.use('/api',searchRoute);
const filter_placeRoute=require('./routes/filterPlaceRoute.js');
app.use('/api',filter_placeRoute);
const viewRoutes = require('./routes/view_Route'); 
app.use('/api', viewRoutes);
const filterAct_Route = require('./routes/filterActRoute'); 
app.use('/api', filterAct_Route);



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
