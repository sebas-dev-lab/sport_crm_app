const Category = require("../../models/Admin/Category");

// ** # Post Category #
exports.post_category = async (req, res) => {
  const { title } = req.body;
  if (!title)
    return res.status(400).json({ msj: "Required data is not available" });
  const category = new Category({ title: title });
  if (!category)
    return res.status(400).json({ msj: "Category could not be created" });
  await category.save();
  return res.status(200).json({ msj: "ok", category: category });
};
