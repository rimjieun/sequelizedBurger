var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {

  db.Burger.findAll()
    .then(function(dbBurger) {
      var hbsObject = {
        burgers: dbBurger
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });

});

router.post("/", function(req, res) {

  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(dbBurger) {
    res.redirect("/");
    console.log(req.body.burger_name);
  });

});

router.put("/:id", function(req, res) {

  console.log(req.body);

  db.Burger.update(req.body,
  {
    where: {
      id: req.params.id
    }
  }).then(function(dbBurger) {
    res.redirect("/");
  });

});

module.exports = router;