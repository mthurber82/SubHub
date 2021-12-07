const router = require("express").Router();
const { User, Subscription } = require("../../models");
const withAuth = require("../../utils/auth");

//Create New Subscription

router.post("/", async (req, res) => {
  try {
    const newSub = await Subscription.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

//Get all subscriptions for user

router.get("/", withAuth, async (req, res) => {
  try {
    const getSubs = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Subscription }],
    });
    const subscriptions = getSubs.get({ plain: true });
    res.status(200).json({
      status: "Success",
      data: subscriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not get users subscriptions",
    });
  }
});
