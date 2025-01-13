const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
    email : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },

    //what to do about confirm password
   

    //otp
    otpReset: {
      type: Number,
      default: null
    },
    otpResetExpires: {
      type: Date,
      default: null
    },
    // profilephoto:{
    //     type:Image,
    //     required:false,
    // },
   role:{
     type: String,
     default: "User",
   },
  //  cartItem: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'products' 
  // }],
  profileImage: {
    type: String,
    default: null
  },
    
})


const User = mongoose.model('users', userSchema)
module.exports = User;