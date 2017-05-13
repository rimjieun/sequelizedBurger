var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
  res.render("index");
});

router.post("/", function(req, res) {
  db.Customer.create({
    customer_name: req.body.customer_name
  }).then(function(dbCustomer) {
    console.log(req.body.customer_name);
    res.redirect("/burger-time");
  });
});

router.get("/burger-time", function(req, res) {

  db.Burger.findAll()
    .then(function(dbBurger) {
      var hbsObject = {
        burgers: dbBurger
      };
      console.log(hbsObject);
      res.render("burgers", hbsObject);
    });

});

router.post("/burger-time", function(req, res) {

  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(dbBurger) {
    res.redirect("/burger-time");
  });

});

router.put("/burger-time/:id", function(req, res) {

  console.log(req.body);

  db.Burger.update(req.body,
  {
    where: {
      id: req.params.id
    }
  }).then(function(dbBurger) {
    res.redirect("/burger-time");
  });

});

module.exports = router;