const Reviews = require("../../models/Admin/Reviews");
const User = require("../../models/Admin/User");

// ** # Create review #
exports.post_review = (req, res) => {
  const { service, review, client } = req.body;
  if (!service || !review || !client)
    return res.status(400).json({ msj: "Data required is not available" });
  User.findOne({ code: client }).then(async (client) => {
    if (!client) {
      return res.status(400).josn({ msj: "Client error" });
    }
    const new_review = new Reviews({ service, review, client: client });
    if (!new_review)
      return res.status(400).json({ msj: "Review could not be created" });
    await new_review.save();
    res.status(200).json({ msj: "ok", review: new_review });
  });
};
