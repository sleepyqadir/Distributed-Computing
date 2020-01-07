module.exports = {
    getDashboardPage: (req, res) => {
      res.render("dashboard.ejs",{
          title: "dashboard",
          message: ""
      });
    }
  };