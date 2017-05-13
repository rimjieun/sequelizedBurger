var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {

  db.Burger.findAll({})
    .then(function(dbBurger) {
      res.render("index", dbBurger);
    });

  // burger.selectAll(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });

});

router.post("/", function(req, res) {

  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(dbBurger) {
    res.redirect("/");
    console.log(req.body.burger_name);
  });

  // burger.insertOne(["burger_name"], [req.body.burger_name], function() {
  //   res.redirect("/");
  //   console.log(req.body.burger_name);
  // });

});

router.put("/:id", function(req, res) {

  db.Burger.update(req.body,
  {
    where: {
      id: req.body.id
    }
  }).then(function(dbBurger) {
    res.redirect("/");
  });


  // var condition = "id = " + req.params.id;

  // console.log("condition", condition);

  // burger.updateOne(
  // {
  //   devoured: req.body.devoured
  // },
  // condition, function() {
  //   res.redirect("/");
  // });
  
});

module.exports = router;