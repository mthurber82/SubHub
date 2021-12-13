const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Subscription extends Model {}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    subscription_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spend: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    renewal_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    filename: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "subscription",
  }
);

module.exports = Subscription;