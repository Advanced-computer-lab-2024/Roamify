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




// Insert dummy data into the database


// Function to insert places


// Define routes here
// e.g. app.use('/api', yourRoute);


//const filterRoute = require('./routes/filterRoute');
//app.use('/api',filterRoute);
const searchRoute=require('./routes/search_Route.js');
app.use('/api',searchRoute);
const viewRoutes = require('./routes/view_Route'); 
app.use('/api', viewRoutes);
const filterAct_Route = require('./routes/filterActRoute'); 
app.use('/api', filterAct_Route);
const sort_Route = require('./routes/sortRoute'); 
app.use('/api', sort_Route);
const filterItin_Route = require('./routes/filterRoute'); 
app.use('/api', filterItin_Route);
const filter_placeRoute=require('./routes/filterPlaceRoute.js');
app.use('/api',filter_placeRoute);
const searchAct_Route=require('./routes/showactivityRoute.js');
app.use('/api',searchAct_Route);
const searchitin_Route=require('./routes/showitineraryRoute.js');
app.use('/api',searchitin_Route);
const searchplace_Route=require('./routes/showplacesRoute.js');
app.use('/api',searchplace_Route);






// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
