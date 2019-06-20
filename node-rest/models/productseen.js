
// defines a product that has been seen/selected 

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const productseenSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true}

});

module.exports = mongoose.model('Productseen', productseenSchema);