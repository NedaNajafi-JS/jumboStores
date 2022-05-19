const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
let envConfig = require('dotenv').config();

const app = express()
const port = process.env.PORT || 5005;
console.log(process.env.PORT)
app.use(express.json());
app.use(express.static(path.dirname(require.main.filename) + '/statics'));

const customerAPIs = require('./routes/customerRoute');
app.use('/api/customer', customerAPIs);

mongoose
.connect(`mongodb+srv://nnajafi:Admin123456@cluster0.llcux.mongodb.net/Jumbo?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
// .connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.llcux.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {

    console.log('MongoDB Connected');
    
  })
  .catch(err => console.log(err));



app.listen(port, () => console.log(`Server Running on port ${port}`))

module.exports = app;
