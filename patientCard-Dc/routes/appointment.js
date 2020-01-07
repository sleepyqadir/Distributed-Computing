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
    let { p_name, doctor, p_id, d_id, date,method } = req.body;
    console.log(p_name, doctor, p_id, d_id, date);
    let query =
      "INSERT INTO `appointment` (p_id,p_name,d_id,doctor,date) VALUES ('" +
      p_id +
      "', '" +
      p_name +
      "', '" +
      d_id +
      "', '" +
      doctor +
      "', '" +
      date +
      "')";
    //////////////// sync //////////////////
    if (method === "sync") {
      console.log("in sync method");
      dbs.forEach(db => {
        try {
          console.log("db");
          db.query(query, (err, result) => {
          console.log("QUERY");            
            if (err) {
              console.log(err)
              return res.status(500).send(err);
            }
            console.log(result,"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          });
        } catch (e) {
          console.log(e,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        }
      });
      console.log("adding done");
      res.redirect("/dashboard/appointment");
    }
  }
};
