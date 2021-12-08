const router = require("express").Router();
const { Subscription, User } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../Config/connection");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const subscriptionData = await sequelize.query(
      "SELECT DISTINCT(subscription_name) FROM Subscription"
    );
    console.log(subscriptionData);
    subs = subscriptionData[0];

    // Pass serialized data and session flag into template
    res.render("landing", {
      subs,
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
    console.log(subscriptionData);
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
    const subscriptions = getSubs.get({ plain: true });
    console.log(subscriptions);
    res.render("homepage", {
      subscriptions,
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
