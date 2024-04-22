"use strict"

const { Schema,model } = require('mongoose')
/* ------------------------------------------------------- *
{
    "category_id": "6620a5fe711fcf52131544e9", shoese
    "brand_id": "6620a3b27ac1a96795bb1a3e", Addidas
    "name": "Product 1"
}
/* ------------------------------------------------------- */
// Product Model:

const ProductSchema = new Schema({

    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    brand_id: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    name: {
        type: String,
        trim: true,
        required: true
    },

    // quantity: {
    //     type: Number,
    //     default: 0
    // },
    stock: {
        type: Number,
        default: 0
    }

}, { collection: 'products', timestamps: true})

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
ProductSchema.pre('init', function (data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = model('Product', ProductSchema)