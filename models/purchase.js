"use strict"

const {Schema, model} = require('mongoose')
/* ------------------------------------------------------- *
{
    "user_id":"66207fb86befad6b1d8419f4"
    "firm_id": "65343222b67e9681f937f304",
    "brand_id": "65343222b67e9681f937f123",
    "product_id": "65343222b67e9681f937f422",
    "quantity": 1000,
    "price": 20
}
/* ------------------------------------------------------- */
// Purchase Model:

const PurchaseSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    firm_id: {
        type: Schema.Types.ObjectId,
        ref: 'Firm',
        required: true
    },

    brand_id: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        default: 0
    },

    price_total: {
        type: Number,
        default: function () { return this.price * this.quantity }, // for CREATE
        transform: function () { return this.price * this.quantity }, // for UPDATE
        // set: function () { return this.price * this.quantity } // for sendingData
    }

}, { collection: 'purchases', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
PurchaseSchema.pre('init', function (data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = model('Purchase', PurchaseSchema)