const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage,getUpdate} = require('./routes/player');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

// 

const config = require("./config.json")
const master = config.master
const shaheer = config.shaheer
const qadir = config.qadir

// //create connection

const db_master = mysql.createConnection(master);
const db_shaheer = mysql.createConnection(shaheer);
const db_qadir = mysql.createConnection(qadir);

// connect
db_master.connect(err => {
  if (err) {
      console.log(err)
    console.log("not allowed")
    console.log(master);
    
    // throw err;
  }
  else{
    console.log("connected to ",master);
  }
});
db_shaheer.connect(err =>{
    if(err){
        console.log(err);
        console.log("not allowed");
        console.log(shaheer);
    }
    else{
        console.log("connected to ",shaheer);
        
    }
})
db_qadir.connect(err => {
  if (err) {
    console.log(err)
    console.log("not allowed")
    console.log(qadir);
    
    // throw err;
  }
  else{
    console.log("connected to ",qadir);
  }
});






global.db = db_master;
global.db2 = db_shaheer
global.db3 = db_qadir
// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
app.get('/update', getUpdate);


// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
