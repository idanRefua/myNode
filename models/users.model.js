const { options } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, required: true },
  likes: { type: Array, required: true },
  randomSecureNumber: { type: String },
  dateSecureNumber: { type: Date },
});

const Users = mongoose.model("Users", userSchema);

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const addUser = (email, password, firstname, lastname, isAdmin, phone) => {
  const user = new Users({
    email,
    password,
    firstname,
    lastname,
    phone,
    isAdmin,
  });

  return user.save();
};

const editUserDetail = (id, validateEmail, validateName, validateLastname) => {
  const filter = { _id: id };
  const update = {
    $set: {
      email: validateEmail,
      firstname: validateName,
      lastname: validateLastname,
    },
  };
  const options = { new: true, useFindAndModify: false };

  return Users.findOneAndUpdate(filter, update, options);
};

const myDetails = (id) => {
  return Users.findOne({ _id: id });
};

const editPassword = (id, validatePassword) => {
  const filter = { _id: id };
  const update = { $set: { password: validatePassword } };
  const options = { new: true, useFindAndModify: false };

  return Users.findOneAndUpdate(filter, update, options);
};

module.exports = {
  selectUserByEmail,
  addUser,
  editUserDetail,
  myDetails,
  editPassword,
};
