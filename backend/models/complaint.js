const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phno:Number,
    area:String,
    problemtype:String,
    description:String,
    progress: {
    type: String,
    default: 'Not Started'
  },
  date: { type: Date, default: Date.now }
})


module.exports = mongoose.model("Complaints",complaintSchema)
