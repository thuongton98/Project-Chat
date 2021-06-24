const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require("socket.io");

require('dotenv').config();

const app = express();


const port=process.env.PORT || 5000;

var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  const  server = app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});