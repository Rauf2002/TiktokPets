'use strict'
// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");

// local modules
const db = require("./sqlWrap");
const win = require("./pickWinner");


// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');


/* might be a useful function when picking random videos */
function getRandomInt(max) {
  let n = Math.floor(Math.random() * max);
  // console.log(n);
  return n;
}


/* start of code run on start-up */
// create object to interface with express
const app = express();

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})
// make all the files in 'public' available 
app.use(express.static("public"));

// if no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/compare.html");
});

// Get JSON out of HTTP request body, JSON.parse, and put object into req.body
app.use(bodyParser.json());


app.get("/getWinner", async function(req, res) {
  console.log("getting winner");
  try {
  // change parameter to "true" to get it to computer real winner based on PrefTable 
  // with parameter="false", it uses fake preferences data and gets a random result.
  // winner should contain the rowId of the winning video.
  let winner = await win.computeWinner(8,true);

  let cmd = `SELECT * FROM VideoTable WHERE rowIdNum = ${winner}`
  let winner_video = await db.get(cmd);
  // you'll need to send back a more meaningful response here.
    console.log(JSON.stringify(winner_video));
  return res.send(JSON.stringify(winner_video));
  } catch(err) {
    res.status(500).send(err);
  }
});


// Get Two Videos 
app.get("/getTwoVideos", async (request, response) => {

  let cmd = 'SELECT * FROM VideoTable;';
  let storage = await db.all(cmd);
  let size = storage.length;
  let num1 = getRandomInt(size);
  let num2 = getRandomInt(size);
  while (num2 == num1) {
    num2 = getRandomInt(size);
  }

  let video_array = [storage[num1], storage[num2]];
  return response.send(JSON.stringify(video_array));
  
});

// Insert PrefTable
app.post("/insertPref", (req, res) =>{
  let pref = req.body;
  insertPrefTable(pref)
  .then(function() { console.log("insert success!") })
    
.catch(function(err) { console.log("SQL error",err)} );
  console.log("sending Response")
  return res.send('recieved POST');
});

// Get Request PrefTable: might delete later
app.get("/getPref", async (request, response) => {

  let cmd = 'SELECT * FROM PrefTable;';
  let storage = await db.all(cmd);

  return response.send(JSON.stringify(storage));
  
});
// Delete end

// Page not found
app.use(function(req, res){
  res.status(404); 
  res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});


async function insertPrefTable(pref) {
  let cmd = 'SELECT * FROM PrefTable;'
  let result = await db.all(cmd);
  let size = result.length;
  if(size < 15) {
    const sql = "INSERT into PrefTable (better,worse) values (?,?)";
    await db.run(sql,[pref.better, pref.worse]);
  } else {
    console.log("FULL DATABASE");
  }
}


