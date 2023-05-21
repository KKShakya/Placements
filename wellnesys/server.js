const express = require('express');
const { connectDB } = require('./config/database.js');
require('dotenv').config();

const userRouter = require('./routes/userRoutes.js')
const port = process.env.PORT || 3500;

const app = express();
app.use(express.json());


app.use('/api/users', userRouter);

app.use('/', (req, res) => {
  res.status(200).send("WElcome to Wellnesys");
})

//running the server
app.listen(port, () => {
  try {
    connectDB();
    console.log("running server on port " + port);
  } catch (error) {
    console.log("error connecting to database")
  }
})


