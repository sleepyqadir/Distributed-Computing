module.exports = {
  getPharmacyPage: (req, res) => {
    let query = "SELECT * FROM `medicine`"; // query database to get all the players
    db_master.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard");
      }
      res.render("pharmacy.ejs", {
        title: "welcome to patientCard",
        message: "",
        medicines: result
      });
    });
  },
  getAddMedicinesPage: (req, res) => {
    res.render("add-medicines.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  },
  addMedicine: (req, res) => {
    if (!req.body) {
      console.log(req.body);
      return res.status(400).send("No files were uploaded.");
    }
    let m_name = req.body.m_name;
    let v_username = req.body.v_username;
    let branch = req.body.branch;
    let quantity = req.body.quantity;
    let method = req.body.method;
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
      res.redirect("/dashboard/pharmacy");
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
      res.redirect("/dashboard/pharmacy");
    } else {
      res.redirect("/dashboard/pharmacy");
    }
  },
  deleteMedicine: (req, res) => {
    let v_username = req.params.id;
    let deleteUserQuery =
      'DELETE FROM medicine WHERE v_username = "' + v_username + '"';
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      dbs.forEach(db => {
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
      res.redirect("/dashboard/pharmacy");
    }
  },
  editMedicinePage: (req, res) => {
    let v_username = req.params.id;
    let query =
      "SELECT * FROM `medicine` WHERE v_username = '" + v_username + "' ";
    db_master.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-medicine.ejs", {
        title: "Edit  Vendor",
        medicine: result[0],
        message: ""
      });
    });
  },
  editMedicine: (req, res) => {
    let vendorId = req.params.id;
    let m_name = req.body.m_name;
    let v_username = req.body.v_username;
    let quantity = req.body.quantity;
    let query =
      "UPDATE `medicine` SET `m_name` = '" +
      m_name +
      "', `quantity` = '" +
      quantity +
      "', `v_username` = '" +
      v_username +
      "' WHERE `medicine`.`v_username` = '" +
      vendorId +
      "'";
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      dbs.forEach(db => {
        db.query(query, (err, result) => {
          if (err) {
            console.log(err)
            return res.status(500).send(err);
          }
        });
      });
      res.redirect("/dashboard/pharmacy");
    }
  }
};
