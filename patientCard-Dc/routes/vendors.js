module.exports = {
  getVendorsPage: (req, res) => {
    let query = "SELECT * FROM `vendor`"; // query database to get all the players
    let query_temp = "SELECT * FROM `vendor_temp`"; // query database to get all the players  
    db_master.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/dashboard");
      }
    db_temp.query(query_temp,(err,result_temp)=>{
      if (err) {
        console.log(err);
        res.redirect("/dashboard");
      }
      res.render("vendor.ejs", {
        title: "patients",
        patients: [...result,...result_temp]
      }); 
    });
  });
  },
  getAddVendorsPage: (req, res) => {
    res.render("add-vendors.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  },
  addVendors: (req, res) => {
    if (!req.body) {
      console.log(req.body);
      return res.status(400).send("No files were uploaded.");
    }
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let v_username = req.body.v_username;
    let branch = req.body.branch;
    let contact = req.body.contact;
    let method = req.body.method;
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
      let query_temp =
      "INSERT INTO `vendor_temp` (firstname, lastname,contact,v_username,branch) VALUES ('" +
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
      res.redirect("/dashboard/vendors");
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
      res.redirect("/dashboard/vendors");
    } else {
      res.redirect("/dashboard/vendors");
    }
  },
  deleteVendor: (req, res) => {
    let v_username = req.params.id;
    let deleteUserQuery =
      'DELETE FROM vendor WHERE v_username = "' + v_username + '"';
    //////////////// sync //////////////////
    if ("sync" === "sync") {
      dbs.forEach(db => {
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
      res.redirect("/dashboard/vendors");
    }
  },
  editVendorPage: (req, res) => {
    let v_username = req.params.id;
    let query = "SELECT * FROM `vendor` WHERE v_username = '" + v_username + "' ";
    db_master.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-vendor.ejs", {
        title: "Edit  Vendor",
        vendor: result[0],
        message: ""
      });
    });
  },
  editVendor: (req, res) => {
    let v_username = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let contact = req.body.contact;
    console.log(lastname);
    let query =
      "UPDATE `vendor` SET `firstname` = '" +
      firstname +
      "', `lastname` = '" +
      lastname +
      "', `contact` = '" +
      contact +
      "' WHERE `vendor`.`v_username` = '" +
      v_username +
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
      res.redirect("/dashboard/vendors");
    }
  }
};
