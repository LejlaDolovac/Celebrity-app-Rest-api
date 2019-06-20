// product related routes 
// here we get our orders - celebs

const express = require('express');
const router = express.Router(); // handels every router
const mongoose = require('mongoose');

const Product = require('../models/product');
const ProductSeen = require('../models/productseen');


// handling request to products 

// GET 
router.get('/', (req, res, next) => {   // next
    Product.find()
    .select('name when _id')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                      name : doc.name,
                      when: doc.when,
                      _id : doc._id,
                      request:{
                          type: 'GET',
                          url:'http://localhost:3000/' + doc._id
                      }   
                };
            })

        };
        res.status(200).json(response); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
});
 
router.get('/seen', (req, res, next) => { 
    ProductSeen.find()
    .select('name _id')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                      name : doc.name,
                      _id : doc._id
                };
            })

        };
        res.status(200).json(response); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
});


// POST 
router.post('/', (req, res, next) => {     // next
     const product = new Product({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         when: req.body.when
          
     });
         // method used for mongoose models
    product
    .save()
    .then(result => {
         console.log(result);
         res.status(201).json({
            message: "C reated product successfully",
            createdProduct : {
                name: result.name,
                when: result.when,
                _id : result._id,
                request: {
                    type : 'GET',
                    url: "http://localhost:3000/" + result._id
                }
            }
    
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    
    }); 
    
});

// POST 
router.post('/move', (req, res, next) => {     // next
    
    console.log(req);
    
    const product = new ProductSeen({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.data.name,         
    });
// method used for mongoose models
   product
   .save()
   .then(result => {
        console.log(result);
        res.status(201).json({
           message: "C reated product successfully",
           createdProduct : {
               name: result.name,
               _id : result._id
           }   
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
   }); 
});

// GET ID 
router.get('./:productId', (req, res, next) => {
     const id = req.params.productId;
     Product.findById(id)
     .exec()
     .then( doc => {
         console.log(doc);
         if(doc){
            res.statu(200).json("From database",doc);
         } else {
            res.status(404).json({
                message: "No valid entry provided for ID"
            });

         }
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err 
         });
     });
     
    });


        // PATCH - change data
    router.patch('./:productId', (req, res, next) => {
        const id = req.params.productId;
        const updateOps = {};
        for(const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
         Product.update({_id: id}, {$set: updateOps})
         .exec()
         .then( result => {
             console.log(result);
             res.status(200).json({
                 message: 'Updated',
                 request : {
                     type: 'GET'
                 }
             });
         })
         .catch(err => {
             console.log(err);
             res.status(500).json({
                 error:err
             });
         });
    });


            // DELETE
    router.delete('/', (req, res, next) => {
        let name = req.body.id;

        console.log(req.body.id);

        Product.deleteOne({name: name}) // removes an object that fulfills criteria
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type:'POST',
                    url : 'http://localhost:3000/products',
                    data: {name: 'String', when: 'String'}

                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });   
    });



 module.exports = router;
