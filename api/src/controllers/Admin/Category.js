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

// ** # Get all categories #
exports.get_all_cateogies = (req, res) => {
  Category.find().then((categories) => {
    if (!categories) {
      return res.status(400).json({ msj: "Categories could not be found" });
    }
    return res.status(200).json({ msk: "ok", categories: categories });
  });
};

// ** # Get one category #
exports.get_one_category = (req, res) => {
  const { code } = req.params;
  if (!code) return res.status(400).json({ msj: "Code is required" });
  Category.findOne({ code: code }).then((category) => {
    if (!category)
      return res.status(400).json({ msj: "Category could not be found" });
    return res.status(200).json({ msj: "ok", category: category });
  });
};

// ** # Put category #
exports.put_category = async (req, res) => {
  const { code, title } = req.body;
  if (!code || !title) return res.status(400).json({ msj: "Data is required" });
  const cat = await Category.findOneAndUpdate({ code: code }, { title: title });
  console.log(cat.title);
  if (cat.title !== title) {
    return res.status(200).json({ msj: "ok", cat: cat });
  } else {
    return res.status(400).json({ msj: "Category can not be modified" });
  }
};

// ** # Delete category #
exports.delete_category = (req, res) => {
  const { code } = req.params;
  Category.findOneAndDelete({ code: code }).then((cat) => {
    Category.findOne({ code: code }).then((control) => {
      if (control) {
        return res.status(400).json({ msj: "Category could not be deleted" });
      }
      return res.status(200).json({ msj: "ok" });
    });
  });
};
