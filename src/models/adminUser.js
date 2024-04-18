const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminUserSchema = new Schema({
  firstname: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true, required: true },
  title: { type: String, trim: true, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
    required: true,
  },
  phoneNumber: { type: String, trim: true, required: true },
  dob: { type: String, trim: true, required: true },
  username: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid username`,
    },
    required: true,
  },
  password: { type: String, trim: true, minLength: 6, required: true },
  role: { type: String, enum: ["ADMIN", "ADMINSTAFF"], default: "ADMINSTAFF" },
  district: { type: String, trim: true, required: true },
  taluka: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  pincode: { type: String, minLength: 6, required: true },
  address: { type: String, trim: true, required: false },
  profession: { type: String, trim: true, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  token: { type: String, trim: true, required: true },
  createdBy: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: Date.now },
});

exports.AdminUser = mongoose.model("AdminUser", adminUserSchema);
