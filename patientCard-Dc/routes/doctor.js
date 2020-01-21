var alert = require("alert-node");
module.exports = {
  getDoctorPage: (req, res) => {
    let query = "SELECT * FROM `doctor`"; // query database to get all the players
    let query_temp = "SELECT * FROM `doctor_temp`"; // query database to get all the players
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
        res.render("doctor.ejs", {
          title: "patients",
          doctor: [...result, ...result_temp]
        });
      });
    });
  },
  getAddDoctorPage: (req, res) => {
    res.render("add-doctor.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  },
  addDoctor: (req, res) => {
    if (!req.body) {
      console.log(req.body);
      return res.status(400).send("No files were uploaded.");
    }
    console.log(req.files);

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let specialist = req.body.specialist;
    let contact = req.body.contact;
    let address = req.body.address;
    let d_username = req.body.d_username;
    let branch = req.body.branch;
    let method = req.body.method;
    let query =
      "INSERT INTO `doctor` (firstname, lastname,d_username,specialist,contact,address,branch) VALUES ('" +
      firstname +
      "', '" +
      lastname +
      "', '" +
      d_username +
      "', '" +
      specialist +
      "', '" +
      contact +
      "', '" +
      address +
      "', '" +
      branch +
      "')";
    let query_temp =
      "INSERT INTO `doctor_temp` (firstname, lastname,d_username,specialist,contact,address,branch) VALUES ('" +
      firstname +
      "', '" +
      lastname +
      "', '" +
      d_username +
      "', '" +
      specialist +
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
            console.log(result);
          });
        } catch (e) {
          console.log(e);
        }
      });
      res.redirect("/dashboard/doctor");
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
      res.redirect("/dashboard/doctor");
    } else {
      res.redirect("/dashboard/doctor");
    }
  },
  deleteDoctor: (req, res) => {
    console.log(req.params.id);
    let adr1 = req.params.id;
    let sql1 = "SELECT * FROM appointment WHERE d_username = ?";
    db_master.query(sql1, [adr1], (err, patient) => {
      if (err) {
        throw err;
      }
      let DoctorId = req.params.id;
      let deleteUserQuery =
        'DELETE FROM doctor WHERE d_username = "' + DoctorId + '"';
      if (patient.length === 0) {
        db_master.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      } else {
        alert("can not delete due to appointment exits");
      }
      res.redirect("/dashboard/doctor");
    });
  },
  editDoctorPage: (req, res) => {
    let doctorId = req.params.id;
    let query = "SELECT * FROM `doctor` WHERE contact = '" + doctorId + "' ";
    db_master.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-doctor.ejs", {
        title: "Edit  Player",
        doctor: result[0],
        message: ""
      });
    });
  },
  editDoctor: (req, res) => {
    let doctorId = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let specialist = req.body.specialist;
    let contact = req.body.contact;
    console.log(lastname);
    let query =
      "UPDATE `doctor` SET `firstname` = '" +
      firstname +
      "', `lastname` = '" +
      lastname +
      "', `specialist` = '" +
      specialist +
      "', `contact` = '" +
      contact +
      "' WHERE `doctor`.`contact` = '" +
      doctorId +
      "'";
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      db_master.query(query, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(res);
      });
      res.redirect("/dashboard/doctor");
    }
  }
};
