const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//let envConfig = require('dotenv').config();

const app = express()
const port = process.env.PORT || 5005;
alert(process.env.PORT)
app.use(express.json());
app.use(express.static(path.dirname(require.main.filename) + '/statics'));

const customerAPIs = require('./routes/customerRoute');
app.use('/api/customer', customerAPIs);

mongoose
  //.connect("mongodb://localhost:27017/jumbo", { useNewUrlParser: true , useUnifiedTopology: true})
  .connect("mongodb+srv://nnajafi:Admin123456@cluster0.llcux.mongodb.net/Jumbo?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {

    console.log('MongoDB Connected');
    
  })
  .catch(err => console.log(err));



app.listen(port, () => console.log(`Server Running on port ${port}`))

module.exports = app;
