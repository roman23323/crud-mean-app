const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;