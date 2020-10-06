const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const quoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    
    
},{timestamps: true});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;

