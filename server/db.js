const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB подключена: ${conn.connection.host}`);  // ← добавь успех
  } catch (err) {
    console.error(`Ошибка подключения к MongoDB: ${err.message}`);  // ← добавь ошибку
    process.exit(1);
  }
};

module.exports = connectDB;