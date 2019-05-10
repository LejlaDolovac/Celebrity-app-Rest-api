
// here we put in new celebs- newCelebs
// status code 201 is the proper code to say everything is working


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // tillhör order.js

const Order = require('../models/order');
const Product = require('../models/product'); 


      // handles incoming GET-request to orders
router.get("/",(req, res, next) => {
      Order
      .find()
      .select('product _id')
      .populate('product','name')
      .exec()
      .then( docs =>{
          res.status(200).json({
              count: docs.length,
              orders: docs.map(doc => {
                  return {
                      _id : doc._id,
                      product: doc.product,
                      request : {
                          type: 'GET',
                          url : 'http://localhosr:3000/orders/' + doc._id
                      }
                     

                  };
              })
             
          });
      })
      .catch( err => {
          res.status(500).json({
              error: err
          });
      });

});


     // create an order
router.post('/',(req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(400).json({
                message: 'Product not found'
            });
        }
        const order = new Order ({
            _id: mongoose.Types.ObjectId(),
            product : req.body.productId
     });
     return order.save();
      
    })
     .then( result => {
         console.log(result);
         res.status(201).json({
             message: 'Order done',
             createdOrder: {
                 _id: result._id
             }            
         });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error : err
         });
     });
    const order = new Order ({
           _id: mongoose.Types.ObjectId(),
           product : req.body.productId
    });
    order.save()
    .exec()
    .then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Order done'            
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});


  // getting order details from a specific order
router.get('/:orderId',(req, res, next) => {
    Order.findById(req.params.oderId)
    .populate('product')
    .exec()
    .then( order =>{
        if(!order){
           return res.status(404).json({
               message: 'Order not found'
           });
        }
       res.status(200).json({
           order: order,
           request : {
               type: 'GET',
               url: 'http://localhost:3000/orders'

           }
       });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    

});

   // deleting an order
router.delete('/:orderId',(req, res, next) => {
    Order.remove({_id: req.params.orderId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'Order deleted',
            request : {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body: { productId: "ID"}
 
            }
        });
     })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});


 

module.exports = router; 