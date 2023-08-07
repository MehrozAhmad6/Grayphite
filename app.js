const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const practiceRoutes = require('./practiceRoutes');
const app = express();
app.use('/',practiceRoutes);
var port = process.env.PORT || 3001;
require("dotenv").config();
console.log(process.env)
let MONGO_URL = process.env.MONGO_DB_URL;
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
