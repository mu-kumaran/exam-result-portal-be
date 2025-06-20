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
        
        //Use this syntax for http, url server request
        return JSON.stringify(dataset)
    
        // Use this syntax for express JS server
        // return dataset.map(doc => doc.toObject())   
    }
    catch(err){
        console.log("Error",err.tostring())
    }
}
module.exports = {finddata}
