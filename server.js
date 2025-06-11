var http = require("http")
var url = require("url")
// var sdb = require("./serverdatabase")
var sdb = require("./server-db")


http.createServer(async (req,res)=>{
    console.log("react-view to server controller")

    res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    
    // Getting request data from react.js(view)
    var reactpath = url.parse(req.url,true)
    console.log(reactpath)
    console.log(reactpath.query)
    var qry = JSON.stringify(reactpath.query)
    console.log(qry)
    var finaldata = JSON.parse(qry)
    console.log(finaldata)
    try{
        
        // sending request data to the database
        var resdata = await sdb.finddata(finaldata)
        console.log(resdata)
        console.log(JSON.stringify(resdata))
        var finalans = JSON.parse(JSON.stringify(resdata))
        console.log(finalans)

        // Sending back the response from database to the react.js (view)
        res.writeHead(200,{"content-type":"application/json"})
        res.write(finalans)
    }
    catch{
        console.log("error from db")
    }
    finally{
        console.log("program end")
        res.end()
    }
}).listen(1234)
console.log("port listening at 1234")