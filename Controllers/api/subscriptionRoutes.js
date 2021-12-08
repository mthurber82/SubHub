const router = require("express").Router();
const { User, Subscription } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");

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

router.put("/:id", withAuth, async (req, res) => {
  try {
    await Subscription.update(
      {
        subscription_name: req.body.subscription_name,
        spend: req.body.spend,
        usage: req.body.usage,
        renewal_date: req.body.renewal_date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Subscription Updated",
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

router.delete("/:subId", withAuth, async (req, res) => {
  try {
    const deleteSub = await Subscription.destroy({
      where: {
        id: req.params.subId,
        user_id: req.session.user_id,
      },
    });

    if (!deleteSub) {
      res.status(404).json({
        status: "Fail",
        message: "No subscription found with this id",
      });
      return;
    }
    res.status(200).json(deleteSub);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not delete subscription",
    });
  }
});

router.get("/search", withAuth, async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    const getSub = await Subscription.findAll({
      where: {
        subscription_name: {
          [Op.startsWith]: name,
        },
      },
      options: {
        distinct: true,
      },
    });
    if (!getSub) {
      res.json({
        status: "Not Found",
        message: "No subscription found with this name",
      });
    }
    res.json(getSub);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

router.get("/validate", withAuth, async (req, res) => {
  const { name } = req.query;
  var nametrunc = name.substring(0, 3);
  console.log(name);
  try {
    const getSub = await Subscription.findAll({
      where: {
        subscription_name: {
          [Op.startsWith]: nametrunc,
        },
      },
      options: {
        distinct: true,
      },
    });
    if (!getSub) {
      res.json({
        status: "Not Found",
        message: "No subscription found with this name",
      });
    }
    res.json(getSub);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err,
    });
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const getSub = await Subscription.findByPk(req.params.id, {});
    const sub = getSub.get({ plain: true });
    req.session.sub_id = sub.id;
    res.json(sub);
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Could not grab subscription",
    });
  }
});
