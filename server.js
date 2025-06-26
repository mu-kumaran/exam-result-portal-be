const express = require("express");
const cors = require("cors");
const sdb = require("./server-cloud"); // your DB query logic
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;

// Enable CORS so that React-frontend can access it.
// So that there wont be any Cross-Origin Reference Error
app.use(cors());

// Optional: for parsing JSON or forms in POST (not used here but good practice)
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// GET request to fetch data by rno and dob
app.get("/api/find", async (req, res) => {
  const { rno, dob } = req.query;

  console.log("Request received from React/client UI:");
  console.log("rno:", rno, "dob:", dob);

  try {
    // Convert rno to integer if needed
    const query = {
      rno: parseInt(rno),
      dob: dob
    };
    console.log(query)
    const result = await sdb.finddata(query);

    if (!result || result.length === 0) {
      return res.status(404).json([]);
    }

    
    // To view the objects hidden in response-data
    console.dir(JSON.parse(JSON.stringify(result)),{depth:null})
  
    //Sending back response-data from db to MVC-react server
    res.status(200).json(result)

  } catch (err) {
    console.error("Error while fetching from DB:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
});

