const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



 const productRoutes = require('./routes/products');  
 const orderRoutes = require('./routes/orders');  

 mongoose.connect(`mongodb+srv://admin:admin123@cluster0-ljuk8.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser : true
 });
mongoose.Promise = global.Promise;



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // parse requests befor handlers 
app.use(bodyParser.json());
 


  // CORS - prevent cors-errors - * = gives everyone access
  app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization'
        );

       if(req.method === 'OPTIONS'){
          res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).json({});

       }
       next();
  });
 


  // Routes which should handle request
app.use('./routes/products', productRoutes);
app.use('./routes/orders', orderRoutes);

   // sends an error

   app.use((req, res, next) => {
       const error = new Error('NOT FOUND!');
       error.status= 404; // sends an error code
       next(error);

   });

     // if 404 fails we want to send another error  if the first request is error and not req.

     app.use((error, req, res, next) => {
         res.status(error.status || 500);
         res.json({
             error: {
                 message: error.message
             }
         });

         
     });

module.exports = app;
 