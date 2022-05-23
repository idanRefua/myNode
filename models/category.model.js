const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

const addCategory = (name) => {
  const category = new Category(name);
  return category.save();
};

module.exports = { addCategory };
