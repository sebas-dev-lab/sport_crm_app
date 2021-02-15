const Contact = require("../../models/Admin/Contact");

exports.post_contact = async (req, res) => {
  const {
    name_center,
    address,
    phone_1,
    phone_2,
    email_1,
    email_2,
    facebook,
    instagram,
    twiter,
    linkedin,
  } = req.body;

  if (!name_center || !address || !phone_1 || !email_1)
    return res.status(400).json({ msj: "Data required is not available" });

  const contact = new Contact({
    name_center,
    address,
    phone_1,
    phone_2,
    email_1,
    email_2,
    facebook,
    instagram,
    twiter,
    linkedin,
  });
  if (!contact)
    return res.status(400).json({ msj: "Contact data could not be created" });
  await contact.save();
  res.status(200).json({ msj: "ok", contact: contact });
};
