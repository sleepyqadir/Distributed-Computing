const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

// constants

const port = 5000;

const { getHomePage } = require("./routes/index");
const {
  getPatientsPage,
  getAddPatientsPage,
  addPatient,
  deletePatient,
  editPatientPage,
  editPatient
} = require("./routes/patients");
const {
  getAppointmentPage,
  getAddAppointmentPage,
  addAppointment
} = require("./routes/appointment");
const { getPharmacyPage } = require("./routes/pharmacy");
const {
  getDoctorPage,
  getAddDoctorPage,
  addDoctor,
  deleteDoctor,
  editDoctor,
  editDoctorPage
} = require("./routes/doctor");
const { getDashboardPage } = require("./routes/dashboard");
const { getLoginPage, getLoginAccess } = require("./routes/login");

const config = require("./config.json");
const master = config.master;
const shaheer = config.shaheer;
const qadir = config.qadir;

// configure middleware

app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// //create connection

const db_master = mysql.createConnection(master);
const db_shaheer = mysql.createConnection(shaheer);
const db_qadir = mysql.createConnection(qadir);

// connect
db_master.connect(err => {
  if (err) {
    console.log(err);
    console.log("not allowed");
    console.log(master);

    // throw err;
  } else {
    console.log("connected to ", master);
  }
});

db_shaheer.connect(err => {
  if (err) {
    console.log(err);
    console.log("not allowed");
    console.log(shaheer);
  } else {
    console.log("connected to ", shaheer);
  }
});
db_qadir.connect(err => {
  if (err) {
    console.log(err);
    console.log("not allowed");
    console.log(qadir);

    // throw err;
  } else {
    console.log("connected to ", qadir);
  }
});

global.db_master = db_master;
global.db_shaheer = db_shaheer;
global.db_qadir = db_qadir;
global.dbs = [db_master, db_shaheer, db_qadir];
//routes of page
//get
app.get("/", getHomePage);
app.get("/login", getLoginPage);
app.get("/dashboard", getDashboardPage);
app.get("/dashboard/pharmacy", getPharmacyPage);
app.get("/dashboard/doctor", getDoctorPage);
app.get("/dashboard/appointment", getAppointmentPage);
app.get("/dashboard/patients", getPatientsPage);
app.get("/dashboard/Add-patients", getAddPatientsPage);
app.get("/dashboard/Add-doctor", getAddDoctorPage);
app.get("/deletePatient/:id", deletePatient);
app.get("/deleteDoctor/:id", deleteDoctor);
app.get("/editPatient/:id", editPatientPage);
app.get("/editDoctor/:id", editDoctorPage);
app.get("/dashboard/Add-appointment", getAddAppointmentPage);

//post
app.post("/login", getLoginAccess);
app.post("/dashboard/Add-patients", addPatient);
app.post("/dashboard/Add-appointment", addAppointment);
app.post("/dashboard/Add-doctor", addDoctor);
app.post("/editPatient/:id", editPatient);
app.post("/editDoctor/:id", editDoctor);

// set the app to listen on the port

app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
