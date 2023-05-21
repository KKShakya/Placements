const mongoose = require('mongoose');

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.mongoUrl);

  console.log(`Connection established with database at ${connection.host}`)
}

module.exports = { connectDB };