module.exports = {
  getLoginPage: (req, res) => {
    res.render("login.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  },
  getLoginAccess: (req, res) => {
    console.log(req.body.email);
    if (!req.body) {
      return res.status(400).send("No files were uploaded.");
    } else {
      // res.send("welcome to" + req.body.email);
      res.redirect("/dashboard");
    }
  }
};
