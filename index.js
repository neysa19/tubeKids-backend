require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require ('mongoose');
const app = express();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

  app.use(cors());
  app.use(express.json());

  const PORT =  process.env.PORT || 3000;

  app.listen (PORT,() => {
    console.log(`Server started at port ${PORT}`);
  });
