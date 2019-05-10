
// defines how a product should look like in an aplication

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    when: {type: String, require: true}

});

module.exports = mongoose.model('Product', productSchema);