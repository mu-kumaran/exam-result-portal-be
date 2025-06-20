var http = require("http")
var url = require("url")
var sdb = require("./server-cloud")
// var sdb = require("./server-db")
require('dotenv').config()

const port = process.env.PORT || 3000
http.createServer(async (req,res)=>{
    console.log("react-view to server controller")

    res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    
    // Getting request data from react.js(view)
    var reactpath = url.parse(req.url,true)
    console.log("react-path: ",reactpath)
    console.log("query: ",reactpath.query)
    var qry = JSON.stringify(reactpath.query)
    console.log(qry)
    var Initialdata = JSON.parse(qry)
    console.log(Initialdata)

    // Convert rno to integer if needed
    var finaldata = {
        rno: parseInt(Initialdata.rno),
        dob: Initialdata.dob
    }
    console.log(finaldata)
    // var finaldata = reactpath.query
    try{
        
        // sending request data to the database
        var resdata = await sdb.finddata(finaldata)
        console.log(resdata)

        // Not necessary - To remove object-id in the response data
        // console.log(JSON.stringify(resdata))
        // var finalans = JSON.parse(JSON.stringify(resdata))
        // console.log("finalans: ",finalans)

        // Sending back the response from database to the react.js (view)
        res.writeHead(200,{"content-type":"application/json"})
        res.write(resdata)
        // res.write(finalans)
    }
    catch{
        console.log("error from db")
    }
    finally{
        console.log("program end")
        res.end()
    }
}).listen(port)
console.log(`port listening at ${port}`)