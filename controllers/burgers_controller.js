var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
  res.render("index");
});

router.post("/", function(req, res) {
  db.Customer.create(req.body).then(function(dbCustomer) {
    res.redirect("/burger-time");
  });
});

router.get("/burger-time", function(req, res) {

  console.log(req.query);
  var query = {};
  // if (req.query.customer_id) {
  //   query.CustomerId = req.query.customer_id;
  // }
  query.CustomerId = 1;

  db.Burger.findAll({
    where: query,
    include: [db.Customer]
  }).then(function(dbBurger) {
      var hbsObject = {
        burgers: dbBurger
      };
      console.log("THIS IS HBSOBJECT: " + hbsObject);
      res.render("burgers", hbsObject);
    });
});

router.post("/burger-time", function(req, res) {

  db.Burger.create(req.body).then(function(dbBurger) {
    res.redirect("/burger-time");
  });

});

router.put("/burger-time/:id", function(req, res) {

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