const ip = require("ip");
// const config = require("../config.json");
// const master = config.master;
// const shaheer = config.shaheer;
// const qadir = config.qadir;
// const system = [master, shaheer, qadir];
module.exports = {
  getPatientsPage: (req, res) => {
    let query = "SELECT * FROM `patient`"; // query database to get all the players
    db_master.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard");
      }
      res.render("patients.ejs", {
        title: "patients",
        patients: result
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
      console.log(req.body);
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
    console.log(method)
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
      dbs.forEach(db => {
        if (ip.address() == "10.57.11.228") {
          try {
            db.query(query, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
      res.redirect("/dashboard/patients");
    } else {
      res.redirect("/dashboard/patients");
    }
  },
  deletePatient: (req, res) => {
    let patientId = req.params.id;
    let deleteUserQuery =
      'DELETE FROM patient WHERE contact = "' + patientId + '"';
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      dbs.forEach(db => {
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
      res.redirect("/dashboard/patients");
    }
  },
  editPatientPage: (req, res) => {
    let patientId = req.params.id;
    let query = "SELECT * FROM `patient` WHERE contact = '" + patientId + "' ";
    db_master.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-patient.ejs", {
        title: "Edit  Player",
        patient: result[0],
        message: ""
      });
    });
  },
  editPatient: (req, res) => {
    let patientId = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let contact = req.body.contact;
    console.log(lastname);
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
      dbs.forEach(db => {
        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
      res.redirect("/dashboard/patients");
    }
  }
};
