const User = require("./User0");
const Subscription = require("./Subscription0");

User.hasMany(Subscription, {
  foreignKey: "user_id",
});

Subscription.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Subscription };
