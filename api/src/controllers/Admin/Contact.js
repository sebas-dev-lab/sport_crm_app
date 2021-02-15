const Contact = require("../../models/Admin/Contact");

// ** # Post contact data #
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

  //   Control required data
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

//** # Get all contact centers #
exports.get_all_contact = (req, res) => {
  Contact.find().then((contacts) => {
    if (!contacts)
      return res.status(404).json({ msj: "Could not found contacts" });
    return res.status(200).json({ msj: "ok", contacts: contacts });
  });
};

//** # Get one contact by name_center #
exports.get_one_contact = async (req, res) => {
  const { name_center } = req.body;

  const contact = await Contact.findOne({ name_center: name_center });
  if (!contact)
    return res
      .status(400)
      .json({ msj: "Can not find any contact with this name" });
  return res.status(200).json({ msj: "ok", contact: contact });
};

//** # Put contact by name_center #
exports.put_contact = async (req, res) => {
  let {
    name_center,
    newName_center,
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

  if (!newName_center) {
    newName_center = name_center;
  }

  const contact_update = await Contact.findOneAndUpdate(
    {
      name_center: name_center,
    },
    {
      name_center: newName_center,
      address,
      phone_1,
      phone_2,
      email_1,
      email_2,
      facebook,
      instagram,
      twiter,
      linkedin,
    }
  );
  if (!contact_update)
    return res.status(400).json({ msj: "Contact Could not be found " });
  return res.status(200).json({ msk: "ok" });
};

//** # delete contact by name_center #
exports.delete_contact = (req, res) => {
  const { name } = req.params;
  Contact.findOneAndDelete(
    { name_center: name },
    async (err, contactDeleted) => {
      if (err) {
        console.log(err);
      } else {
        console.log(contactDeleted);
        const control = await Contact.findOne({ name_center: name });
        if (control === contactDeleted) {
          return res
            .status(400)
            .json({ msj: "Contact was not deleted or does not exist" });
        } else {
          return res.status(200).json({ msj: "ok" });
        }
      }
    }
  );
};
