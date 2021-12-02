const sequelize = require("../Config/connection");
const { User, Subscription } = require("../models");

const userData = require("./userData.json");
const subscriptionData = require("./subscriptionData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Subscription.bulkCreate(subscriptionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
