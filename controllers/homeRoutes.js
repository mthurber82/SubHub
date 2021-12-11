const router = require("express").Router();
const { Subscription, User } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const subscriptionData = await Subscription.findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("spend")), "total_spend"],
      ],
      raw: true,
    });
    const total = subscriptionData[0].total_spend * 12;

    // Pass serialized data and session flag into template
    res.render("landing", {
      total,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/createUser", async (req, res) => {
  res.render("createUser");
});

router.get("/createSubscription", withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const subscriptionData = await sequelize.query(
      "SELECT DISTINCT(subscription_name) FROM Subscription"
    );
    subs = subscriptionData[0];

    // Pass serialized data and session flag into template
    res.render("createSubscription", {
      subs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  console.log("hello");
  try {
    const getSubs = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Subscription }],
    });
    const costs = await User.findByPk(req.session.user_id, {
      include: {
        model: Subscription,
      },
      attributes: [
        [sequelize.fn("sum", sequelize.col("spend")), "total_spend"],
      ],
      raw: true,
    });
    const usageNum = await User.findByPk(req.session.user_id, {
      include: {
        model: Subscription,
      },
      attributes: [
        [sequelize.fn("max", sequelize.col("usage")), "total_usage"],
      ],
      raw: true,
    });
    console.log(usageNum.total_usage);
    const usage = await Subscription.findAll({
      where: {
        [Op.and]: [
          { user_id: req.session.user_id },
          { usage: usageNum.total_usage },
        ],
      },
      raw: true,
    });
    const subscriptions = getSubs.get({ plain: true });
    const annual = costs.total_spend * 12;
    sumUsage = usage[0];
    console.log(subscriptions);
    res.render("homepage", {
      subscriptions,
      costs,
      annual,
      sumUsage,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not get users subscriptions",
    });
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
