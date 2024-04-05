const {Schema, model, default: mongoose} = require('mongoose')

const userSchema = new Schema({
    username : {
        type:String,
        trim:true,
        required: [true,'User name is required'],
        unique :true

    },
    password:{
        type:String,
        minlength:6,
        required:[true,'Password is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique :true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please provide a valid email']

    },
    first_name:{
        type:String,
        required:[true,'First name is required']
    },
    last_name:{
        type:String,
        required:[true,'Last name is required']
    },
    is_active:{
        type:Boolean,
        default:true
       
    },
    is_staff:{
        type:Boolean,
        default:false
        
    },
    is_superadmin:{
        type:Boolean,
        default:false
        
    }
},{timestamps:true}) 


const  passwordEncrypt = require('../helpers/passwordEncrypt')

userSchema.pre(['save','updateOne'], function(next){
    // get data from 'this" when create
    // if process is updateOne , data will receive in "this_update"

    /*
      const data = this?._update || this => this line is getting the data that will be saved or updated
      if the operation is updateOne, the data is in this_update
      if operation is saved, the data is in this

    */
   const data = this?._update || this

   // email@domain.com
    const isEmailValidated = data.email
    ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email) // test from "data"
    : true

    if(isEmailValidated){
        if(data?.password){
            const isPasswordValidated = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(data.password)

            if(isPasswordValidated){
                this.password = data.password = passwordEncrypt(data.password)
                this._update = data // udateOne will wait data from "this._update"
            }else{
                next(new Error('Password not validated'))
            }
            next()
        }else{
            next(new Error('Email not validated'))
        }
    }

})

// For react Project
// "Month/Day/Year".
// i am convertin "_id" to "id", so in frontend , i can call it as "id" 
userSchema.pre('init', function(data){
    data.id = data._id
    data.created = data.createdAt.toLocalDateString('en-US')
})

module.exports= model('User',userSchema)