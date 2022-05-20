const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const envConfig = require('dotenv').config();
const cluster = require('cluster');

const app = express()

let workers = [];

const setupWorkers = () => {

  const cores = require('os').cpus().length;
  for(let i = 0; i< cores; i++){
    workers.push(cluster.fork());

    workers[i].on('message', function(message){
      console.log(workers[i].process.pid, message);
    });
  }

  cluster.on('online', function(worker) {
    // console.log(`Worker ${Worker} is listening`);
  });

  cluster.on('exit', (worker) => {
    // console.log(`Worker ${worker} is died and a new worker is being created`);

    workers.push(cluster.fork());

    workers[workers.length - 1].on('message', (message) => {
      console.log(workers[i], message);
    });
    
  });

}

const setupExpressApp = () => {

  console.log(`cluster is worker ${cluster.isWorker}`);

  const port = process.env.PORT || 5005;
  
  app.use(express.json());
  app.use(express.static(path.dirname(require.main.filename) + '/statics'));
  
  const customerAPIs = require('./routes/customerRoute');
  app.use('/api/customer', customerAPIs);
  
  mongoose
  .connect(`mongodb+srv://nnajafi:Admin123456@cluster0.llcux.mongodb.net/Jumbo?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
  //.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.llcux.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
  
      console.log('MongoDB Connected');
      
    })
    .catch(err => console.log(err));
  
  
  
  app.listen(port, () => console.log(`Server Running on port ${port}`));
  
}

const setupServer = (isClusterRequired) => {
  if(isClusterRequired && cluster.isMaster){

    setupWorkers();

  }else{
    setupExpressApp();
  }
}

setupServer(true);

module.exports = app;
