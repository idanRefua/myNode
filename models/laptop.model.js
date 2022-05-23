const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laptopProduct = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  shortinfo: { type: String, required: true },
  cpu: { type: String, required: true },
  gpu: { type: String, required: true },
  ram: { type: String, required: true },
  battery: { type: String, required: true },
  harddrive: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Types.ObjectId, required: true },
});

const LaptopProduct = mongoose.model("LaptopProduct", laptopProduct);

const allLaptopsProducts = () => {
  return LaptopProduct.find({});
};

const myLaptopsProducts = (createdBy) => {
  return LaptopProduct.findById({ createdBy });
};

const deleteLaptopById = (id) => {
  return LaptopProduct.deleteOne({ _id: id });
};

const addLaptopProduct = (
  title,
  image,
  shortinfo,
  cpu,
  gpu,
  ram,
  battery,
  harddrive,
  description,
  price,
  createdBy
) => {
  const laptopProduct = new LaptopProduct({
    title,
    image,
    shortinfo,
    cpu,
    gpu,
    ram,
    battery,
    harddrive,
    description,
    price,
    createdBy,
  });

  return laptopProduct.save();
};

module.exports = {
  allLaptopsProducts,
  myLaptopsProducts,
  deleteLaptopById,
  addLaptopProduct,
};
