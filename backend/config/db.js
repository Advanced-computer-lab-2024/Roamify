const mongoose = require('mongoose');
MONGO_URI = "mongodb+srv://mohamedelquesni:O12NZAtmcCAnCzgN@roamifycluster.ysomb.mongodb.net/testingDB?retryWrites=true&w=majority&appName=RoamifyCluster";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
