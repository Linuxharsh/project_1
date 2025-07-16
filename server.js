const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
console.log('Mongo is connected ',MONGO_URL);
const app = express();
app.use(express.json());
//PORT
const PORT = 3000;
app.get('/',(req ,res ) => {
  console.log('server has started');
  res.send('Server is up and running!');
})
const eventRoutes = require('./routes/routing');
app.use('/api/events',eventRoutes);


mongoose.connect(MONGO_URL)
.then(()=> {
  console.log('Mongo is running');
  app.listen(PORT ,()=> {
    console.log(`server is started on the address of http://localhost:${PORT}`);

  })
})
.catch (error => {
  console.log('mongo connection is failed',MONGO_URL);
  process.exit(1);
})