// const { mongoose, } = require('../configs/dbConnection')
const {mongoose,Schema} = require('mongoose')
/* ------------------------------------------------------- *
{
  "user_id": "65343222b67e9681f937f001",
  "token": "...tokenKey..."
}
/* ------------------------------------------------------- */
// Token Model:

const TokenSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }, 

    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
    }, 

}, { collection: 'tokens', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
TokenSchema.pre('init', function(data) {
    data.id = data._id
    data.created = data.createdAt.toLocaleDateString('en-US')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Token', TokenSchema)