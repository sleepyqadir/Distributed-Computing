const ip = require("ip");
const config = require("../config.json");
var alert = require("alert-node");
const master = config.master;
const shaheer = config.shaheer;
const qadir = config.qadir;
const system = [master, shaheer, qadir];
module.exports = {
  getPatientsPage: (req, res) => {
    let query = "SELECT * FROM `patient`"; // query database to get all the players
    let query_temp = "SELECT * FROM `patient_temp`"; // query database to get all the players
    db_master.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard");
      }
      db_temp.query(query_temp, (err, result_temp) => {
        if (err) {
          console.log(err);
          res.redirect("/dashboard");
        }
        res.render("patients.ejs", {
          title: "patients",
          patients: [...result, ...result_temp]
        });
      });
    });
  },
  getAddPatientsPage: (req, res) => {
    res.render("add-patients.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  },
  addPatient: (req, res) => {
    if (!req.body) {
      return res.status(400).send("No files were uploaded.");
    }
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let p_username = req.body.p_username;
    let branch = req.body.branch;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let address = req.body.address;
    let method = req.body.method;
    console.log(method);
    let query =
      "INSERT INTO `patient` (firstname, lastname,p_username,gender,contact,address,branch) VALUES ('" +
      firstname +
      "', '" +
      lastname +
      "', '" +
      p_username +
      "', '" +
      gender +
      "', '" +
      contact +
      "', '" +
      address +
      "', '" +
      branch +
      "')";

    let query_temp =
      "INSERT INTO `patient_temp` (firstname, lastname,p_username,gender,contact,address,branch) VALUES ('" +
      firstname +
      "', '" +
      lastname +
      "', '" +
      p_username +
      "', '" +
      gender +
      "', '" +
      contact +
      "', '" +
      address +
      "', '" +
      branch +
      "')";
    //////////////// sync //////////////////
    if (method === "sync") {
      dbs.forEach(db => {
        try {
          db.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
      res.redirect("/dashboard/patients");
    } else if (method === "async") {
      try {
        db_temp.query(query_temp, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      } catch (e) {
        console.log(e);
      }
      res.redirect("/dashboard/patients");
    } else {
      res.redirect("/dashboard/patients");
    }
  },
  deletePatient: (req, res) => {
    let adr1 = req.params.id;
    let sql1 = "SELECT * FROM appointment WHERE p_username = ?";

    db_master.query(sql1, [adr1], (err, patient) => {
      if (err) {
        throw err;
      }
      let patientId = req.params.id;
      let deleteUserQuery =
        'DELETE FROM patient WHERE p_username = "' + patientId + '"';
      if (patient.length === 0) {
        db_master.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log("return after deleting");
      } else {
        alert("sorry appointment exists cant delete this patient");
      }
      res.redirect("/dashboard/patients");
    });
  },
  editPatientPage: (req, res) => {
    let patientId = req.params.id;
    let query = "SELECT * FROM `patient` WHERE contact = '" + patientId + "' ";
    let query_temp =
      "SELECT * FROM `patient_temp` WHERE contact = '" + patientId + "' ";
    db_master.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      db_master.query(query_temp, (err, result2) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render("edit-patient.ejs", {
          title: "Edit  Player",
          patient: [...result, ...result2],
          message: ""
        });
      });
    });
  },
  editPatient: (req, res) => {
    let patientId = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let contact = req.body.contact;
    let query =
      "UPDATE `patient` SET `firstname` = '" +
      firstname +
      "', `lastname` = '" +
      lastname +
      "', `gender` = '" +
      gender +
      "', `contact` = '" +
      contact +
      "' WHERE `patient`.`contact` = '" +
      patientId +
      "'";
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      db_master.query(query, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      res.redirect("/dashboard/patients");
    }
  }
};
