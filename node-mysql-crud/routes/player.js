const fs = require("fs");
const ip = require("ip");
const config = require("../config.json");
const shaheer = config.shaheer;
const qadir = config.qadir;

module.exports = {
  getUpdate: (req, res) => {
    let query = "INSERT INTO `players`  (SELECT * FROM `players_temp`);"; // query database to get all the players
    let query_temp = "SELECT * FROM `players_temp` ORDER BY id ASC";
    let query_delete = "TRUNCATE `players_temp`";
    if (ip.address() === "10.0.75.1") {
      db.query(query, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        db.query(query_delete, (err, result) => {
          if (err) {
            console.log(err);
            res.redirect("/");
          }
          console.log(result);
        });
        //res.redirect('/')
        console.log(result);
      });
    }
    if (ip.address() === shaheer.host) {
      db2.query(query_temp, (err, result) => {
        if (err) {
          console.log(err);
          res.redirect("/");
        }
        //res.redirect('/');
        result.forEach(value => {
          let query_insert =
            "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
            value.first_name +
            "', '" +
            value.last_name +
            "', '" +
            value.position +
            "', '" +
            value.number +
            "', '" +
            value.image_name +
            "', '" +
            value.user_name +
            "')";
          db.query(query_insert, (err, result) => {
            if (err) {
              console.log(err);
              res.redirect("/");
            }
            console.log(result);
          });
        });
        db2.query(query_delete, (err, result) => {
          if (err) {
            console.log(err);
            res.redirect("/");
          }
          console.log(result);
        });
        res.redirect("/");
        //console.log(result[0].first_name);
      });
    }
    if (ip.address() === qadir.host) {
      db3.query(query_temp, (err, result) => {
        if (err) {
          console.log(err);
          res.redirect("/");
        }
        //res.redirect('/');
        result.forEach(value => {
          let query_insert =
            "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
            value.first_name +
            "', '" +
            value.last_name +
            "', '" +
            value.position +
            "', '" +
            value.number +
            "', '" +
            value.image_name +
            "', '" +
            value.user_name +
            "')";
          db.query(query_insert, (err, result) => {
            if (err) {
              console.log(err);
              res.redirect("/");
            }
            console.log(result);
          });
        });
        db3.query(query_delete, (err, result) => {
          if (err) {
            console.log(err);
            res.redirect("/");
          }
          console.log(result);
        });
        res.redirect("/");
        //console.log(result[0].first_name);
      });
    }
  },
  addPlayerPage: (req, res) => {
    res.render("add-player.ejs", {
      title: "Welcome to Socka | Add a new player",
      message: ""
    });
  },
  addPlayer: (req, res) => {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    let message = "";
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    let username = req.body.username;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let gender = req.body.gender;

    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = username + "." + fileExtension;

    let usernameQuery =
      "SELECT * FROM `players` WHERE user_name = '" + username + "'";

    db.query(usernameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        message = "Username already exists";
        res.render("add-player.ejs", {
          message,
          title: "Welcome to Socka | Add a new player"
        });
      } else {
        // check the filetype before uploading it
        if (
          uploadedFile.mimetype === "image/png" ||
          uploadedFile.mimetype === "image/jpeg" ||
          uploadedFile.mimetype === "image/gif"
        ) {
          // upload the file to the /public/assets/img directory
          uploadedFile.mv(`img/${image_name}`, err => {
            if (err) {
              return res.status(500).send(err);
            }
            // send the player's details to the database
            if (gender == "male") {
              let query =
                "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                first_name +
                "', '" +
                last_name +
                "', '" +
                position +
                "', '" +
                number +
                "', '" +
                image_name +
                "', '" +
                username +
                "')";

              try {
                db.query(query, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  console.log(result);
                  //res.redirect("/");
                });
              } catch (e) {
                console.log(e);
              }
              try {
                db2.query(query, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  console.log(result);
                  res.redirect("/");
                });
              } catch (e) {
                console.log(e);
              }
              try {
                db3.query(query, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  console.log(result);
                  res.redirect("/");
                });
              } catch (e) {
                console.log(e);
              }
            } else if (gender == "female") {
              let query =
                "INSERT INTO `players_temp` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                first_name +
                "', '" +
                last_name +
                "', '" +
                position +
                "', '" +
                number +
                "', '" +
                image_name +
                "', '" +
                username +
                "')";
              if (ip.address() === "10.0.75.1") {
                try {
                  db.query(query, (err, result) => {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    console.log(result);
                    res.redirect("/");
                  });
                } catch (e) {
                  console.log(e);
                }
              } else if (ip.address() === shaheer.host) {
                try {
                  db2.query(query, (err, result) => {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    console.log(result);
                    res.redirect("/");
                  });
                } catch (e) {
                  console.log(e);
                }
              } else if (ip.address() === qadir.host) {
                try {
                  db3.query(query, (err, result) => {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    console.log(result);
                    res.redirect("/");
                  });
                } catch (e) {
                  console.log(e);
                }
              }
            }
          });
        } else {
          message =
            "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
          res.render("add-player.ejs", {
            message,
            title: "Welcome to Socka | Add a new player"
          });
        }
      }
    });
  },
  editPlayerPage: (req, res) => {
    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-player.ejs", {
        title: "Edit  Player",
        player: result[0],
        message: ""
      });
    });
    db2.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-player.ejs", {
        title: "Edit  Player",
        player: result[0],
        message: ""
      });
    });
  },
  editPlayer: (req, res) => {
    let playerId = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    var sql =
      "UPDATE customer SET address = 'Canyon 123' WHERE address = 's545'";
    let query =
      "UPDATE players` SET `first_name` = '" +
      first_name +
      "', `last_name` = '" +
      last_name +
      "', `position` = '" +
      position +
      "', `number` = '" +
      number +
      "' WHERE `players`.`id` = '" +
      playerId +
      "'";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
    db2.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  },
  deletePlayer: (req, res) => {
    let playerId = req.params.id;
    let getImageQuery =
      'SELECT image from `players` WHERE id = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      let image = result[0].image;

      fs.unlink(`img/${image}`, err => {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          //res.redirect("/");
        });
      });
    });
    db2.query(getImageQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      //let image = result[0].image;

      db2.query(deleteUserQuery, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect("/");
      });
    });
  }
};
