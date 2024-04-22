"use strict"

const { Schema,model } = require('mongoose')
/* ------------------------------------------------------- *
{
    "name": "Firm 1"
    "phone": "999 88 77",
    "address": "Address"
}
/* ------------------------------------------------------- */
// Firm Model:

const FirmSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        trim: true,
    },

    address: {
        type: String,
        trim: true,
    },

    image: { // URL
        type: String,
        trim: true
    }

}, { collection: 'Firms', timestamps: true })

// FOR REACT PROJECT:
FirmSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('en-US')
})

module.exports = model('Firm', FirmSchema)