"use strict"
const {Schema, model} = require('mongoose')
/* ------------------------------------------------------- *
{
    "name": "Brand 1"
}
/* ------------------------------------------------------- */
// Brand Model:

const BrandSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: { // URL
        type: String,
        trim: true
    }

}, { collection: 'brands', timestamps: true })


// FOR REACT PROJECT:
BrandSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('en-US')
})
/* ------------------------------------------------------- */
module.exports = model('Brand', BrandSchema)