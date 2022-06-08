const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  shortinfo: { type: String, required: true },
  description: { type: String, required: true },
  likes: [String],
  category: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Types.ObjectId, required: true },
});

const Products = mongoose.model("Products", productSchema);

const addProduct = (
  category,
  title,
  image,
  shortinfo,
  description,
  price,
  likes,
  createdBy
) => {
  const product = new Products({
    category,
    title,
    image,
    shortinfo,
    description,
    price,
    likes,
    createdBy,
  });
  return product.save();
};

const allProducts = () => {
  return Products.find({});
};

const productById = (id) => {
  return Products.findOne({ _id: id });
};

const productsByUserId = (createdBy) => {
  return Products.find({ createdBy });
};

const deleteProduct = (id) => {
  return Products.deleteOne({ _id: id });
};

const updateProduct = (id, userId, body) => {
  const updateProduct = body;
  const filter = {
    _id: id,
    createdBy: userId,
  };

  return Products.updateOne(filter, updateProduct);
};

const addLikeToProduct = (id, userId) => {
  /* Products.findByIdAndUpdate(id, { $push: { likes: userId } }) */
  const filter = {
    _id: id,
  };

  const addLike = {
    $addToSet: { likes: userId },
  };

  return Products.findOneAndUpdate(filter, addLike);
};

const myFavourites = (userId) => {
  return Products.find({ likes: { $in: [userId] } });
};

const removeLikeFromProduct = (id, userId) => {
  return Products.findByIdAndUpdate(id, { $pull: { likes: userId } });
};

const allDesktopPcProducts = () => {
  return Products.find({ category: "Desktop Pc" });
};

const allSmartphoneProducts = () => {
  return Products.find({ category: "Smartphones" });
};

const allLaptopProducts = () => {
  return Products.find({ category: "Laptops" });
};

module.exports = {
  addProduct,
  allProducts,
  productsByUserId,
  deleteProduct,
  updateProduct,
  addLikeToProduct,
  myFavourites,
  removeLikeFromProduct,
  allDesktopPcProducts,
  productById,
  allSmartphoneProducts,
  allLaptopProducts,
};
