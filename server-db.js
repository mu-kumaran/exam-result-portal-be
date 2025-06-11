const mongoose = require("mongoose");
const User = require("./usermodel");

// Mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/manojdb").then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log("db connection error",err)
})

// Find operation using mongoose
async function finddata(inputdata)
{
    try{  
        const dataset = await User.find(inputdata)
        console.log("From mongoose:",dataset)
        return JSON.stringify(dataset)
    }
    catch(err){
        console.log("Error",err.tostring())
    }
}
module.exports = {finddata}
