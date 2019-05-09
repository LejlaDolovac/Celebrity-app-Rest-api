// product related routes 

const express = require('express');
const router = express.Router(); // handels every router
const mongoos = require('mongoose');

const Product = require('.../models/product');



// handling request to products 


        // GET 
router.get('/ ', (req, res, next) => {   // next
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
       // if(docs.length >= 0){
            res.status(200).json(response); 
      //  } else {
           //  res.status(404).json({
           //     message : "No names found"
          //   });
      //  }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
});
 


      // POST 
router.post('/ ', (req, res, next) => {     // next
     const product = New Product({
         _id: new mongoos.Types.ObjectId(),
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
    router.delete('./:productId', (req, res, next) => {
        const id = req.params.productId;
        Product.remove({_id: id}) // removes an object that fulfills criteria
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
