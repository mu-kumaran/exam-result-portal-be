const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    rno:{
        type:Number,
        required:true
    },
    dob:{
        type:String,
        required:true
    }
})

const usermdl = mongoose.model("hse_marklist",userSchema)
module.exports = usermdl