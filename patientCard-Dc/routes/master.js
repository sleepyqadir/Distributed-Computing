const ip = require("ip");

module.exports = {
  updatePatientMaster: (req, res) => {
    let query = "SELECT * FROM `patient_temp`"; // query database to get all the players
    let query_delete = "TRUNCATE `patient_temp`";
    db_temp.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/patients");
      }
      result.forEach(element => {
        let query_insert =
          "INSERT INTO `patient` (firstname, lastname,p_username,gender,contact,address,branch) VALUES ('" +
          element.firstname +
          "', '" +
          element.lastname +
          "', '" +
          element.p_username +
          "', '" +
          element.gender +
          "', '" +
          element.contact +
          "', '" +
          element.address +
          "', '" +
          element.branch +
          "')";
        try {
          db_master.query(query_insert, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
    try {
      db_temp.query(query_delete, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/dashboard/patients");
  },
  updateDoctorMaster: (req, res) => {
    let query = "SELECT * FROM `doctor_temp`"; // query database to get all the players
    let query_delete = "TRUNCATE `doctor_temp`";
    db_temp.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/doctor");
      }
      result.forEach(element => {
        let query =
          "INSERT INTO `doctor` (firstname, lastname,d_username,specialist,contact,address,branch) VALUES ('" +
          element.firstname +
          "', '" +
          element.lastname +
          "', '" +
          element.d_username +
          "', '" +
          element.specialist +
          "', '" +
          element.contact +
          "', '" +
          element.address +
          "', '" +
          element.branch +
          "')";
        try {
          db_master.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
    try {
      db_temp.query(query_delete, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/dashboard/doctor");
  },
  updateAppointmentMaster: (req, res) => {
    let query = "SELECT * FROM `appointment_temp`"; // query database to get all the players
    let query_delete = "TRUNCATE `appointment_temp`";
    db_temp.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/doctor");
      }
      result.forEach(element => {
        let adr1 = element.p_username;
        let adr2 = element.d_username;
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
              element.p_username +
              "', '" +
              doctor[0].firstname +
              "', '" +
              element.d_username +
              "', '" +
              element.date +
              "')";
            try {
              console.log("db");
              db_master.query(query, (err, result) => {
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
        });
      });
    });
    try {
      db_temp.query(query_delete, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/dashboard/appointment");
  },
  updatePharmacyMaster: (req, res) => {
    let query = "SELECT * FROM `medicine_temp`"; // query database to get all the players
    let query_delete = "TRUNCATE `medicine_temp`";
    db_temp.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/pharmacy");
      }
      result.forEach(element => {
        let query =
          "INSERT INTO `medicine` (v_username,m_name,quantity,branch) VALUES ('" +
          element.v_username +
          "', '" +
          element.m_name +
          "', '" +
          element.quantity +
          "', '" +
          element.branch +
          "')";
        try {
          db_master.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
    try {
      db_temp.query(query_delete, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/dashboard/pharmacy");
  },
  updateVendorMaster: (req, res) => {
    let query = "SELECT * FROM `vendor_temp`"; // query database to get all the players
    let query_delete = "TRUNCATE `vendor_temp`";
    db_temp.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/vendors");
      }
      result.forEach(element => {
        let query =
          "INSERT INTO `vendor` (firstname, lastname,contact,v_username,branch) VALUES ('" +
          element.firstname +
          "', '" +
          element.lastname +
          "', '" +
          element.contact +
          "', '" +
          element.v_username +
          "', '" +
          element.branch +
          "')";
        try {
          db_master.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
    try {
      db_temp.query(query_delete, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
    res.redirect("/dashboard/vendors");
  }
};
