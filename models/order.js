// defines how a order should look like in an aplication

// kna kanske ta bort detta då vi ej behöver en order då vi har allt i produkt.js

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.schema.Types.objectId,
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, // ref connects the model you weant to conncet this model to

   
});

module.exports = mongoose.model('Order', orderSchema);