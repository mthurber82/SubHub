const router = require("express").Router();
const { User, Subscription } = require("../../models");

//Get All Subscriptions for User

// router.get("/", (req, res) => {
//   try {
//     const getSubs = await Subscription.findAll(
//       {
//         include: [
//           {
//             model: User,
//             attributes: ["username"],
//           },
//         ],
//       },
//       {
//         where: {
//           user_id: req.session.user_id,
//         },
//       }
//     );
//     res.status(200).json(getSubs);
//   } catch (err) {
//     res.status(500).json({
//       status: "Fail",
//       message: "Could not get users subscriptions",
//     });
//   }
// });

module.exports = router;
