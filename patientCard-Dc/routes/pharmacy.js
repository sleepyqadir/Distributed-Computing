module.exports = {
  getPharmacyPage: (req, res) => {
    res.render("pharmacy.ejs", {
      title: "welcome to patientCard",
      message: ""
    });
  }
};
