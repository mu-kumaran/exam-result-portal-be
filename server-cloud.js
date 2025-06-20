const mongoose = require('mongoose');
const User = require("./usermodel");
require("dotenv").config()

const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function finddata(inputdata){
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to DB:", mongoose.connection.db.databaseName);

    const dataset = await User.find(inputdata)
    console.log("From mongoose:",dataset)

    //Use this syntax for http, url server request
    // return JSON.stringify(dataset)
    
    // Use this syntax for express JS server request
    return dataset.map(doc => doc.toObject())   

  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

module.exports = {finddata}