const mongoose = require('mongoose');
// MONGO_URI = 'mongodb+srv://netninja:test1234@nodetuts.pd4zq.mongodb.net/roamify'
MONGO_URI = 'mongodb+srv://mostafa03ashraf:4wWh61nMVmKI8g3Z@nodecourse.aqowg.mongodb.net/Roamify'

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
