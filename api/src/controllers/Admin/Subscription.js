const Suscription = require("../../models/Admin/Subscription");
const Services = require("../../models/Admin/Services");

// ** Create Suscriptions **
exports.post_suscription = async (req, res) => {
  const { title, description, service } = req.body;

  if (!title || !description || !service) {
    return res.status(400).json({ msj: "Data is required" });
  }
  const status = true;
  const date_obj = new Date();
  const date =
    date_obj.getDate() +
    "-" +
    (date_obj.getMonth() + 1) +
    "-" +
    date_obj.getFullYear();

  const services = await Services.findOne({ title: service });

  if (!services) {
    return res.status(400).json({ msj: "Service/s could not be found" });
  }

  const suscription_new = new Suscription({
    title,
    description,
    services,
    status,
    date,
  });

  await suscription_new.save();
  if (suscription_new) {
    return res.status(200).json({ msj: "ok", suscription: suscription_new });
  } else {
    return res.status(400).json({ msj: "Create Suscription services Error" });
  }
};

// ** Get all Suscriptions **
exports.get_suscriptions = async (req, res) => {
  const suscriptions = await Suscription.find();
  if (!suscriptions) {
    return res.status(400).json({ msj: "Find Suscriptions Error" });
  }
  return res.status(200).json({ msj: "ok", suscriptions: suscriptions });
};

// ** Get_one Suscription **
exports.get_one_suscription = async (req, res) => {
  const { code } = req.params;
  const suscription = await Suscription.findOne({ code: code });
  if (!suscription) {
    return res.status(400).json({ msj: "Could no be found" });
  }
  return res.status(200).json({ msj: "ok", suscription: suscription });
};
// ** Update Suscription **
exports.put_suscription = async (req, res) => {
  const { code } = req.params;
  const { title, description, status, date } = req.body;

  //   if (!title || !description || !status) {
  //     return res.status(400).json({ msj: "Data is required" });
  //   }
  const _old_susc = await Suscription.findOne({ code: code });
  if (!_old_susc) {
    return res.status(400).json({ msj: "Could no found suscription service" });
  }

  Suscription.findOneAndUpdate(
    { code: code },
    { title, description, status, date }
  ).then(async (suscription) => {
    return res.status(200).json({ msj: "ok" });
  });
};

// ** Delete Suscriptions **
exports.delete_suscription = (req, res) => {
  const { code } = req.params;
  Suscription.findOneAndDelete({ code: code }).then(async (suscription) => {
    const control = await Suscription.findOne({ code: code });
    if (control) {
      return res
        .status(400)
        .json({ mjs: "Suscription Service could not be deleted" });
    }
    return res.status(200).json({ mjs: "ok" });
  });
};
