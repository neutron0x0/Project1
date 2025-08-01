const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:String,
    salary:String,
    department:String,
    office:String,
    password:String
})

module.exports = mongoose.model("Employees",employeeSchema)