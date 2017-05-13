module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,15]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Burger.belongsTo(models.Customer);
      }
    }
  });
  return Burger;
};