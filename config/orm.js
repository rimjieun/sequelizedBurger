var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(obj) {
  var arr = [];

  for (var key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      arr.push(key + "=" + obj[key]);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(tableName, cb) {
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  insertOne: function(tableName, cols, vals, cb) {
    var queryString = "INSERT INTO " + tableName;

    queryString += " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ")";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  updateOne: function(tableName, object, condition, cb) {
    var queryString = "UPDATE " + tableName;

    queryString += " SET " + objToSql(object) + " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;