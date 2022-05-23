const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const desktopPcProduct = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  shortinfo: { type: String, required: true },
  cpu: { type: String, required: true },
  gpu: { type: String, required: true },
  ram: { type: String, required: true },
  harddrive: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Types.ObjectId, required: true },
});

const DesktopPcProduct = mongoose.model("DesktopPcProduct", desktopPcProduct);

const allDesktoppcProduct = () => {
  // get all the desktop pc products
  return DesktopPcProduct.find({});
};

const myDesktoppcProducts = (createdBy) => {
  // get all the desktop pc products by id of user who create it
  return DesktopPcProduct.findById({ createdBy });
};

const addDesktopPcProduct = (
  title,
  image,
  shortinfo,
  cpu,
  gpu,
  ram,
  harddrive,
  description,
  price,
  createdBy
) => {
  const desktopPc = new DesktopPcProduct({
    title,
    image,
    shortinfo,
    cpu,
    gpu,
    ram,
    harddrive,
    description,
    price,
    createdBy,
  });
  return desktopPc.save();
};

const deleteDesktopPcProduct = (id) => {
  return DesktopPcProduct.deleteOne({ _id: id });
};

const updateDesktopPcProduct = (id, userId, body) => {
  const updateDesktopPc = body;
  const filter = {
    _id: id,
    createdBy: userId,
  };
  return DesktopPcProduct.updateOne(filter, updateDesktopPc);
};

const productById = (id) => {
  return DesktopPcProduct.findOne({ _id: id });
};

module.exports = {
  allDesktoppcProduct,
  myDesktoppcProducts,
  addDesktopPcProduct,
  deleteDesktopPcProduct,
  updateDesktopPcProduct,
  productById,
};
