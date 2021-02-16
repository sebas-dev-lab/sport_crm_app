const Reviews = require("../../models/Admin/Reviews");
const User = require("../../models/Admin/User");

// ** # Create review #
exports.post_review = (req, res) => {
  const { service, review, client } = req.body;
  if (!service || !review || !client)
    return res.status(400).json({ msj: "Data required is not available" });

  // TODO: verificar que el servicio exista

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

// ** # Get all review by service title #
exports.get_all_reviews = async (req, res) => {
  const { service } = req.params;
  if (!service) {
    return res.status(400).json({ msj: "Need Service params" });
  }
  const revs = await Reviews.find({ service: service });
  // Is not a control- the first return if there is not reviews for the service
  if (revs.length === 0)
    return res
      .status(200)
      .json({ msj: "Reviews could not be found for this", reviews: revs });
  return res.status(200).json({ msj: "ok", reviews: revs });
};

// ** # Put review by code #
// ?? Only the review atributte can change

exports.put_review = async (req, res) => {
  const { code, review, client, service } = req.body;

  const _client = await User.findOne({ code: client });

  const rev = await Reviews.findOneAndUpdate(
    { code: code },
    {
      code,
      review,
      client: _client,
      service,
    }
  );
  const _old = await Reviews.findOne({ code: code });
  if (_old) {
    if (_old.review === rev.review) {
      return res.status(400).json({ msj: "Review could not be modified" });
    }
    return res.status(200).json({ msj: "ok", review: rev });
  } else {
    return res.status(400).json({ msj: "Error" });
  }
};

// ** # delete review by cocde #
exports.delete_review = (req, res) => {
  const { code } = req.params;
  Reviews.findOneAndDelete({ code: code }).then(async (rev) => {
    if (rev) {
      const control = await Reviews.findOne({ code: code });
      if (control) {
        return res.status(400).json({ msj: "Review could not be deleted" });
      }
      return res.status(200).json({ msj: "ok" });
    } else {
      return res.status(400).json({ msj: "Review could not be found" });
    }
  });
};
