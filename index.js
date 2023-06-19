const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Parse incoming request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Furation_Tech_Solution_ASSESSMENT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use(express.urlencoded()); // help in making  POST Api calls
app.use("/", require("./controllers/Items"));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
