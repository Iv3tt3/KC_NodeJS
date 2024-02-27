const mongoose = require('mongoose');

// set advertisement schema
const advertSchema = mongoose.Schema({
    name: { 
        type: String, 
        //required: true 
        },
    sell: {
        type: Boolean, 
        //required: true 
        },
    price: { 
        type: Number, 
        //required: true 
        },
    photo: {
        type: String, 
        //required: true
        },
    tags: {
        type: String, 
        enum: ['Work', 'Lifestyle', 'Motor', 'House', 'Clothes', 'Sports', 'Tech' ,'Other']},
});

// create advert model
const Advert = mongoose.model('Advert', advertSchema)

// (optional) export model
module.exports = Advert;