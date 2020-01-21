module.exports = {
  getAppointmentPage: (req, res) => {
    let query = "SELECT * FROM `appointment`"; // query database to get all the players
    db_master.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard");
      }
      console.log(result);
      res.render("appointment.ejs", {
        title: "appointment",
        appointment: result
      });
    });
  },
  getAddAppointmentPage: (req, res) => {
    res.render("add-appointment.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  },
  addAppointment: (req, res) => {
    if (!req.body) {
      console.log(req.body);
      return res.status(400).send("No files were uploaded.");
    }

    let { p_username, d_username, date, method } = req.body;
    let adr1 = p_username;
    let adr2 = d_username;
    let sql1 = "SELECT firstname FROM patient WHERE p_username = ?";
    let sql2 = "SELECT firstname FROM doctor WHERE d_username = ?";

    //////////////// sync //////////////////
      db_master.query(sql1, [adr1], (err, patient) => {
        if (err) {
          throw err;
        }
      db_master.query(sql2, [adr2], (err, doctor) => {
          if (err) {
            throw err;
          }
          let query =
            "INSERT INTO `appointment` (p_name,p_username,doctor,d_username,date) VALUES ('" +
            patient[0].firstname +
            "', '" +
            p_username +
            "', '" +
            doctor[0].firstname +
            "', '" +
            d_username +
            "', '" +
            date +
            "')";
            let query =

            "INSERT INTO `appointment_temp` (p_name,p_username,doctor,d_username,date) VALUES ('" +
            patient[0].firstname +
            "', '" +
            p_username +
            "', '" +
            doctor[0].firstname +
            "', '" +
            d_username +
            "', '" +
            date +
            "')";
        if (method === "sync") {
          dbs.forEach(db => {
            try {
              console.log("db");
              db.query(query, (err, result) => {
                console.log("QUERY");
                if (err) {
                  console.log(err);
                  return res.status(500).send(err);
                }
              });
            } catch (e) {
              console.log(e);
            }
          });
        }
        else if (method === "async") {
          try {
            db_temp.query(query_temp, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
            });
          } catch (e) {
            console.log(e);
          }
        res.redirect("/dashboard/appointment");
      }
      else {
        res.redirect("/dashboard/appointment");
      }
        });
      });
      console.log("adding done");
      res.redirect("/dashboard/appointment");
  },
  deleteAppointment: (req, res) => {
    let p_username = req.params.id;
    let deleteUserQuery =
      'DELETE FROM appointment WHERE p_username = "' + p_username + '"';
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      dbs.forEach(db => {
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          console.log(result);
        });
      });
      res.redirect("/dashboard/appointment");
    }
  },
  editAppointmentPage: (req, res) => {
    let p_username = req.params.id;
    let query =
      "SELECT * FROM `appointment` WHERE p_username = '" + p_username + "' ";
    db_master.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-appointment.ejs", {
        title: "Edit  appointment",
        appoint: result[0],
        message: ""
      });
    });
  },
  editAppointment: (req, res) => {
    if (!req.body) {
      return res.status(400).send("No files were uploaded.");
    }
    let appointId = req.params.id;
    let { p_username, d_username, date } = req.body;
    console.log(p_username,d_username)
    let query =
      "UPDATE `appointment` SET `p_username` = '" +
      p_username +
      "', `doctor` = '" +
      d_username +
      "', `date` = '" +
      date +
      "' WHERE `appointment`.`p_username` = '" +
      appointId +
      "'";
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      dbs.forEach(db => {
        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          console.log(result);
        });
      });
      console.log("adding done");
      res.redirect("/dashboard/appointment");
    }
  }
};
