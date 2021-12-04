const router = require("express").Router();
const { User, Subscription } = require("../../models");

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
