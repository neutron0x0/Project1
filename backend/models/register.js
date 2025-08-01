const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        unique:true
    },
    password:String,
    email:String,
    phno:String,
    address:String
})

module.exports = mongoose.model("Customers",registerSchema);