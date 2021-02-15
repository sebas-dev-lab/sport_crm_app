const Service = require("../../models/Admin/Services");
const Category = require("../../models/Admin/Category");
const Reviews = require("../../models/Admin/Reviews");

// ** # Post service #
exports.post_service = (req, res) => {
  const { category, title, resume, description, price, ranking } = req.body;

  if (!category || !title || !resume || !description || !price) {
    return res.status(400).json({ msj: "Required data is not aviable" });
  }
  Category.findOne({ title: category }).then(async (category) => {
    if (!category)
      return res
        .status(400)
        .json({ msj: "Categroy could no be found or does not exist" });
    Reviews.find({ service: title }).then(async (reviews) => {
      const service = new Service({
        title,
        resume,
        description,
        price,
        ranking,
        reviews: reviews,
        category: category,
      });
      if (!service)
        return res.status(400).json({ msj: "Service Could not be created" });
      await service.save();
      return res.status(200).json({ msj: "ok", service: service });
    });
  });
};
// ** # Get all Services

// ** # Get Service by code #

// ** # Put Service #

// ** # Delete Service #
