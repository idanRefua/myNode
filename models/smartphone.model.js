const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const smartphoneProduct = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  shortinfo: { type: String, required: true },
  cpu: { type: String, required: true },
  ram: { type: String, required: true },
  battery: { type: String, required: true },
  camera: { type: String, required: true },
  screen: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Types.ObjectId, required: true },
});

const SmartphoneProduct = mongoose.model(
  "SmartphoneProduct",
  smartphoneProduct
);

const addSmartPhoneProduct = (
  title,
  image,
  shortinfo,
  cpu,
  ram,
  battery,
  camera,
  screen,
  description,
  price,
  createdBy
) => {
  const smartPhone = new SmartphoneProduct({
    title,
    image,
    shortinfo,
    cpu,
    ram,
    battery,
    camera,
    screen,
    description,
    price,
    createdBy,
  });
  return smartPhone.save();
};

const allSmartphoneProducts = () => {
  return SmartphoneProduct.find({});
};

const mySmartphones = (createdBy) => {
  return SmartphoneProduct.find({ createdBy });
};

module.exports = {
  addSmartPhoneProduct,
  allSmartphoneProducts,
  mySmartphones,
};
