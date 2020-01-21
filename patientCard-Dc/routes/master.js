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
    res.redirect("/dashboard/doctor");
  },
  updateAppointmentMaster: (req, res) => {
    let query = "SELECT * FROM `appointment_temp`"; // query database to get all the players
    let query_delete = "TRUNCATE `appointment_temp`";
    db_temp.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard/appointment");
      }
      result.forEach(element => {
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
          v_username +
          "', '" +
          m_name +
          "', '" +
          quantity +
          "', '" +
          branch +
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
          firstname +
          "', '" +
          lastname +
          "', '" +
          contact +
          "', '" +
          v_username +
          "', '" +
          branch +
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
    res.redirect("/dashboard/vendors");
  }
};
