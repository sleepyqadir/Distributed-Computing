const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const app = express();
const ip = require("ip");
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
  addAppointment,
  deleteAppointment,
  editAppointmentPage,
  editAppointment
} = require("./routes/appointment");
const {
  getPharmacyPage,
  getAddMedicinesPage,
  addMedicine,
  editMedicinePage,
  editMedicine,
  deleteMedicine
} = require("./routes/pharmacy");
const {
  getDoctorPage,
  getAddDoctorPage,
  addDoctor,
  deleteDoctor,
  editDoctor,
  editDoctorPage
} = require("./routes/doctor");
const {
  getVendorsPage,
  getAddVendorsPage,
  addVendors,
  deleteVendor,
  editVendorPage,
  editVendor
} = require("./routes/vendors");
const {
  updatePatientMaster,
  updateDoctorMaster,
  updateAppointmentMaster,
  updatePharmacyMaster,
  updateVendorMaster
} = require("./routes/master");
const { getDashboardPage } = require("./routes/dashboard");
const { getLoginPage, getLoginAccess } = require("./routes/login");

const config = require("./config.json");
const master = config.master;
const shaheer = config.shaheer;
const qadir = config.qadir;
const configs_array = [master, shaheer,qadir];

const temp = configs_array.filter(db => db.host === ip.address());

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

// temp db //////////////////

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

function get_temp(db) {
  if (db === "db_shaheer") {
    return db_shaheer;
  } else if (db === "db_qadir") {
    return db_qadir;
  } else {
    return db_master;
  }
}

global.db_temp = get_temp(temp[0].db);

console.log(db_temp)

global.db_master = db_master;
global.db_shaheer = db_shaheer;
global.db_qadir = db_qadir;
global.dbs = [db_master, db_shaheer];
//routes of page
//get
app.get("/", getHomePage);
app.get("/login", getLoginPage);
app.get("/dashboard", getDashboardPage);
app.get("/dashboard/pharmacy", getPharmacyPage);
app.get("/dashboard/doctor", getDoctorPage);
app.get("/dashboard/appointment", getAppointmentPage);
app.get("/dashboard/patients", getPatientsPage);
app.get("/dashboard/vendors", getVendorsPage);
app.get("/dashboard/Add-patients", getAddPatientsPage);
app.get("/dashboard/Add-vendors", getAddVendorsPage);
app.get("/dashboard/Add-medicines", getAddMedicinesPage);
app.get("/dashboard/Add-doctor", getAddDoctorPage);
app.get("/deletePatient/:id", deletePatient);
app.get("/deleteDoctor/:id", deleteDoctor);
app.get("/deleteVendor/:id", deleteVendor);
app.get("/deleteMedicine/:id", deleteMedicine);
app.get("/deleteAppointment/:id", deleteAppointment);
app.get("/editPatient/:id", editPatientPage);
app.get("/editDoctor/:id", editDoctorPage);
app.get("/editVendor/:id", editVendorPage);
app.get("/editMedicine/:id", editMedicinePage);
app.get("/editAppointment/:id", editAppointmentPage);
app.get("/dashboard/Add-appointment", getAddAppointmentPage);
app.get("/update-patient", updatePatientMaster);
app.get("/update-doctor", updateDoctorMaster);
app.get("/update-appointment", updateAppointmentMaster);
app.get("/update-medicines", updatePharmacyMaster);
app.get("/update-vendors", updateVendorMaster);

//post
app.post("/login", getLoginAccess);
app.post("/dashboard/Add-patients", addPatient);
app.post("/dashboard/Add-vendors", addVendors);
app.post("/dashboard/Add-appointment", addAppointment);
app.post("/dashboard/Add-doctor", addDoctor);
app.post("/dashboard/Add-medicines", addMedicine);
app.post("/editPatient/:id", editPatient);
app.post("/editVendor/:id", editVendor);
app.post("/editDoctor/:id", editDoctor);
app.post("/editAppointment/:id", editAppointment);
app.post("/editMedicine/:id", editMedicine);

// set the app to listen on the port

app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
