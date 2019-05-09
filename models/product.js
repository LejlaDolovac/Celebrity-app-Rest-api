
// defines how a product should look like in an aplication

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.schema.Types.objectId,
    name: {type: String, required: true},
    when: {type: String, require: true}

});

module.exports = mongoose.model('Product', productSchema);