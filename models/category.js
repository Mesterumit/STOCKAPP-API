"use strict"

const {Schema,model} = require('mongoose')
/* ------------------------------------------------------- *
{
    "name": "Category 1"
}
/* ------------------------------------------------------- */
// Category Model:

const CategorySchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

}, { collection: 'categories', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
CategorySchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('en-US')
})
/* ------------------------------------------------------- */
module.exports = model('Category', CategorySchema)