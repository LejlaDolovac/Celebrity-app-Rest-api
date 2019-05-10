// defines how a order should look like in an aplication

// kna kanske ta bort detta då vi ej behöver en order då vi har allt i produkt.js

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
   product: { type: Schema.Types.ObjectId, ref: 'Product', required: true}, // ref connects the model you weant to conncet this model to

   
});

module.exports = mongoose.model('Order', orderSchema);