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

    // TODO: Revisar: es probable que Reviews convenga incorporarlo en PUT ya que al crear todavía no existe review

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
exports.get_all_services = async (req, res) => {
  const services = await Service.find();
  if (!services)
    return res.status(400).json({ msj: "Could not find any service" });
  return res.status(200).json({ msj: "ok", services: services });
};

// ** # Get Service by code #
exports.get_service_code = (req, res) => {
  const { code } = req.params;
  if (!code) res.status(400).json({ msj: "Code is not available" });
  Service.findOne({ code: code }).then((service) => {
    if (!service)
      return res.status(400).json({ msj: "Service Could not be found" });
    return res.status(200).json({ msj: "ok", service: service });
  });
};

// ** # Put Service: need "code for find service and can control" #
exports.put_service = async (req, res) => {
  const {
    code,
    title,
    category,
    resume,
    description,
    price,
    ranking,
  } = req.body;

  if (!code || !title || !resume || !description || !price)
    res.status(400).json({ msj: "Data is not available" });

  const serv = await Service.findOne({ code: code });
  console.log(serv);
  let review_title = title;
  let category_title = category;
  if (serv) {
    if (serv.title !== title) {
      review_title = title;
    }
  }
  Category.findOne({ title: category_title }).then((category) => {
    if (!category)
      return res.status(400).json({ msj: "Category Could not be found" });
    Reviews.find({ service: review_title }).then((reviews) => {
      Service.findOneAndUpdate(
        { code: code },
        {
          title,
          resume,
          description,
          price,
          ranking,
          category: category,
          reviews: reviews,
        }
      ).then((service) => {
        if (!service)
          return res.status(400).json({ msj: "Service Could not be found" });
        res.status(200).json({ msj: "ok", service: service });
      });
    });
  });
};

// ** # Delete Service #
exports.delete_service = (req, res) => {
  const { code } = req.params;
  if (!code) res.status(400).json({ msj: "Code is required" });
  Service.findOneAndDelete({ code: code }).then(async (service) => {
    const serv = await Service.findOne({ code: code });
    if (serv)
      return res.status(400).json({ msj: "Service could not be deleted" });
    return res.status(200).json({ msj: "ok" });
  });
};
